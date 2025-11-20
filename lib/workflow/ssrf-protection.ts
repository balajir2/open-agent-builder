/**
 * SSRF (Server-Side Request Forgery) Protection
 *
 * Prevents HTTP nodes from accessing:
 * - Private IP addresses (internal networks)
 * - Localhost/loopback addresses
 * - Cloud metadata endpoints
 * - Link-local addresses
 */

import { URL } from 'url';
import * as dns from 'dns';
import { promisify } from 'util';

const dnsLookup = promisify(dns.lookup);

// Private IP ranges (RFC 1918)
const PRIVATE_IP_RANGES = [
  /^10\./,                          // 10.0.0.0/8
  /^172\.(1[6-9]|2[0-9]|3[01])\./,  // 172.16.0.0/12
  /^192\.168\./,                    // 192.168.0.0/16
  /^127\./,                         // 127.0.0.0/8 (loopback)
  /^169\.254\./,                    // 169.254.0.0/16 (link-local)
  /^0\./,                           // 0.0.0.0/8
  /^255\.255\.255\.255$/,           // Broadcast
];

// Blocked hostnames
const BLOCKED_HOSTS = [
  'localhost',
  'localhost.localdomain',
  'ip6-localhost',
  'ip6-loopback',
  '0.0.0.0',
  '::1',
  'metadata.google.internal',      // GCP metadata
  'metadata',                       // GCP metadata (short form)
  'instance-data',                  // AWS metadata
];

// Cloud metadata endpoints (AWS, GCP, Azure, Oracle)
const METADATA_IP_PATTERNS = [
  /^169\.254\.169\.254$/,           // AWS, Azure, Oracle Cloud
  /^169\.254\.169\.253$/,           // AWS
  /^fd00:ec2::254$/,                // AWS IPv6
  /^100\.100\.100\.200$/,           // Alibaba Cloud
];

/**
 * Check if an IP address is private/internal
 */
function isPrivateIP(ip: string): boolean {
  // Check IPv4 private ranges
  for (const pattern of PRIVATE_IP_RANGES) {
    if (pattern.test(ip)) {
      return true;
    }
  }

  // Check IPv6 private ranges
  if (ip.startsWith('fe80:') || ip.startsWith('fc00:') || ip.startsWith('fd00:')) {
    return true; // Link-local and ULA
  }

  if (ip === '::1' || ip === '::') {
    return true; // Loopback and unspecified
  }

  return false;
}

/**
 * Check if an IP is a cloud metadata endpoint
 */
function isMetadataIP(ip: string): boolean {
  for (const pattern of METADATA_IP_PATTERNS) {
    if (pattern.test(ip)) {
      return true;
    }
  }
  return false;
}

/**
 * Check if a hostname is blocked
 */
function isBlockedHostname(hostname: string): boolean {
  const normalizedHost = hostname.toLowerCase();
  return BLOCKED_HOSTS.some(blocked => normalizedHost === blocked || normalizedHost.endsWith(`.${blocked}`));
}

/**
 * Validate URL for SSRF protection
 * Returns { valid: true } if safe, or { valid: false, reason: string } if dangerous
 */
export async function validateURLForSSRF(url: string): Promise<{ valid: boolean; reason?: string }> {
  try {
    // Parse the URL
    const parsedUrl = new URL(url);

    // Only allow HTTP/HTTPS
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return {
        valid: false,
        reason: `Protocol '${parsedUrl.protocol}' not allowed. Only HTTP and HTTPS are permitted.`,
      };
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    // Check blocked hostnames
    if (isBlockedHostname(hostname)) {
      return {
        valid: false,
        reason: `Hostname '${hostname}' is blocked for security reasons.`,
      };
    }

    // Check if hostname is already an IP address
    const isIPAddress = /^\d+\.\d+\.\d+\.\d+$/.test(hostname) || hostname.includes(':');

    if (isIPAddress) {
      // Direct IP access - check if it's private
      if (isPrivateIP(hostname)) {
        return {
          valid: false,
          reason: `Direct access to private IP addresses is not allowed.`,
        };
      }

      if (isMetadataIP(hostname)) {
        return {
          valid: false,
          reason: `Access to cloud metadata endpoints is blocked for security.`,
        };
      }
    } else {
      // Hostname - resolve to IP and check
      try {
        const { address, family } = await dnsLookup(hostname);

        // Check if resolved IP is private
        if (isPrivateIP(address)) {
          return {
            valid: false,
            reason: `Hostname '${hostname}' resolves to a private IP address (${address}).`,
          };
        }

        // Check if resolved IP is metadata endpoint
        if (isMetadataIP(address)) {
          return {
            valid: false,
            reason: `Hostname '${hostname}' resolves to a cloud metadata endpoint (${address}).`,
          };
        }
      } catch (dnsError) {
        // DNS lookup failed - might be a DNS rebinding attack
        return {
          valid: false,
          reason: `Unable to resolve hostname '${hostname}'. DNS lookup failed.`,
        };
      }
    }

    // Check for unusual ports (optional - you may want to allow custom ports)
    const port = parsedUrl.port;
    if (port) {
      const portNum = parseInt(port, 10);
      // Block common internal service ports
      const blockedPorts = [
        22,   // SSH
        23,   // Telnet
        25,   // SMTP
        3306, // MySQL
        5432, // PostgreSQL
        6379, // Redis
        27017, // MongoDB
        9200, // Elasticsearch
        11211, // Memcached
      ];

      if (blockedPorts.includes(portNum)) {
        return {
          valid: false,
          reason: `Port ${portNum} is blocked for security reasons.`,
        };
      }
    }

    // URL is safe
    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      reason: `Invalid URL: ${error instanceof Error ? error.message : 'Parse error'}`,
    };
  }
}

/**
 * Validate URL synchronously (less secure, use async version when possible)
 * Only checks hostname patterns, does not perform DNS lookup
 */
export function validateURLForSSRFSync(url: string): { valid: boolean; reason?: string } {
  try {
    const parsedUrl = new URL(url);

    // Only allow HTTP/HTTPS
    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      return {
        valid: false,
        reason: `Protocol '${parsedUrl.protocol}' not allowed.`,
      };
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    // Check blocked hostnames
    if (isBlockedHostname(hostname)) {
      return {
        valid: false,
        reason: `Hostname '${hostname}' is blocked.`,
      };
    }

    // Check if it's an IP address
    const isIPAddress = /^\d+\.\d+\.\d+\.\d+$/.test(hostname) || hostname.includes(':');

    if (isIPAddress) {
      if (isPrivateIP(hostname) || isMetadataIP(hostname)) {
        return {
          valid: false,
          reason: `Access to private/internal IP addresses is not allowed.`,
        };
      }
    }

    return { valid: true };
  } catch (error) {
    return {
      valid: false,
      reason: `Invalid URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

/**
 * Get allowed domain whitelist from environment
 * Format: ALLOWED_HTTP_DOMAINS=example.com,api.example.com,*.trusted.com
 */
export function getAllowedDomains(): string[] | null {
  const domains = process.env.ALLOWED_HTTP_DOMAINS;
  if (!domains) return null;

  return domains
    .split(',')
    .map(d => d.trim())
    .filter(d => d.length > 0);
}

/**
 * Check if URL matches allowed domain whitelist
 */
export function isAllowedDomain(url: string, allowedDomains: string[]): boolean {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.toLowerCase();

    for (const allowed of allowedDomains) {
      // Wildcard support: *.example.com
      if (allowed.startsWith('*.')) {
        const domain = allowed.slice(2).toLowerCase();
        if (hostname === domain || hostname.endsWith(`.${domain}`)) {
          return true;
        }
      } else {
        // Exact match
        if (hostname === allowed.toLowerCase()) {
          return true;
        }
      }
    }

    return false;
  } catch {
    return false;
  }
}
