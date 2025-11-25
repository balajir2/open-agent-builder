/**
 * Cache Cleanup Cron Job
 *
 * Automatically removes expired cache entries every 5 minutes.
 */

import { cronJobs } from "convex/server";
import { internal } from "../../_generated/api";

const crons = cronJobs();

/**
 * Cleanup expired cache entries
 * Runs every 5 minutes
 */
crons.interval(
  "cleanup-expired-cache",
  { minutes: 5 },
  internal.functions.cache.cleanup.cleanupExpired
);

export default crons;
