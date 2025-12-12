import { WorkflowNode, WorkflowState } from '../types';
import { substituteVariables } from '../variable-substitution';
import { validateURLForSSRF, getAllowedDomains, isAllowedDomain } from '../ssrf-protection';

/**
 * Execute HTTP Request Node with SSRF Protection
 */
export async function executeHTTPNode(
  node: WorkflowNode,
  state: WorkflowState
): Promise<any> {
  const { data } = node;
  const nodeData = data as any;

  try {
    // Substitute variables in URL
    const url = substituteVariables(nodeData.httpUrl || '', state);
    const method = nodeData.httpMethod || 'GET';

    // SSRF Protection: Validate URL
    const validation = await validateURLForSSRF(url);

    if (!validation.valid) {
      throw new Error(`SSRF Protection: ${validation.reason}`);
    }

    // Optional: Check domain whitelist if configured
    const allowedDomains = getAllowedDomains();
    if (allowedDomains && allowedDomains.length > 0) {
      if (!isAllowedDomain(url, allowedDomains)) {
        throw new Error(
          `Domain not in whitelist. Allowed domains: ${allowedDomains.join(', ')}`
        );
      }
    }

    // Build headers
    const headers: Record<string, string> = {};

    if (nodeData.httpHeaders && Array.isArray(nodeData.httpHeaders)) {
      nodeData.httpHeaders.forEach((h: any) => {
        if (h.key && h.value) {
          headers[h.key] = substituteVariables(h.value, state);
        }
      });
    }

    // Add authentication
    if (nodeData.httpAuthType === 'bearer' && nodeData.httpAuthToken) {
      headers['Authorization'] = `Bearer ${nodeData.httpAuthToken}`;
    } else if (nodeData.httpAuthType === 'api-key' && nodeData.httpAuthToken) {
      headers['X-API-Key'] = nodeData.httpAuthToken;
    } else if (nodeData.httpAuthType === 'basic' && nodeData.httpAuthToken) {
      headers['Authorization'] = `Basic ${btoa(nodeData.httpAuthToken)}`;
    }

    // Build request body
    let body: string | undefined = undefined;
    console.log('🔍 HTTP Node Debug - Raw httpBody from node data:', nodeData.httpBody);
    console.log('🔍 HTTP Node Debug - Method:', method);

    if ((method === 'POST' || method === 'PUT' || method === 'PATCH') && nodeData.httpBody) {
      body = substituteVariables(nodeData.httpBody, state);
      console.log('🔍 HTTP Node Debug - Body after variable substitution:', body);
    } else {
      console.log('🔍 HTTP Node Debug - Body NOT set because:', {
        isPostPutPatch: method === 'POST' || method === 'PUT' || method === 'PATCH',
        hasHttpBody: !!nodeData.httpBody,
        httpBodyValue: nodeData.httpBody
      });
    }

    console.log('HTTP Request:', { method, url, headers, body });

    // Make the request
    const response = await fetch(url, {
      method,
      headers,
      body,
    });

    const responseData = await response.json().catch(() => response.text());

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Convert headers to plain object
    const headersObj: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headersObj[key] = value;
    });

    return {
      status: response.status,
      statusText: response.statusText,
      headers: headersObj,
      data: responseData,
      url,
      method,
    };
  } catch (error) {
    console.error('HTTP request error:', error);
    throw new Error(`HTTP request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
