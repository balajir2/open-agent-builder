/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as admin from "../admin.js";
import type * as apiKeys from "../apiKeys.js";
import type * as apiKeysActions from "../apiKeysActions.js";
import type * as approvals from "../approvals.js";
import type * as executions from "../executions.js";
import type * as files from "../files.js";
import type * as functions_cache_cleanup from "../functions/cache/cleanup.js";
import type * as functions_cache_cleanupExpired from "../functions/cache/cleanupExpired.js";
import type * as functions_cache_delete from "../functions/cache/delete.js";
import type * as functions_cache_get from "../functions/cache/get.js";
import type * as functions_cache_set from "../functions/cache/set.js";
import type * as http_uploadFile from "../http/uploadFile.js";
import type * as http from "../http.js";
import type * as lib_encryption from "../lib/encryption.js";
import type * as lib_utils from "../lib/utils.js";
import type * as mcpServers from "../mcpServers.js";
import type * as rateLimits_check from "../rateLimits/check.js";
import type * as systemApiKeys from "../systemApiKeys.js";
import type * as templates from "../templates.js";
import type * as uiBuilderConfigurations from "../uiBuilderConfigurations.js";
import type * as userLLMKeys from "../userLLMKeys.js";
import type * as userLLMKeysActions from "../userLLMKeysActions.js";
import type * as userMCPs from "../userMCPs.js";
import type * as userToolKeys from "../userToolKeys.js";
import type * as userToolKeysActions from "../userToolKeysActions.js";
import type * as users from "../users.js";
import type * as workflows from "../workflows.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const fullApi: ApiFromModules<{
  admin: typeof admin;
  apiKeys: typeof apiKeys;
  apiKeysActions: typeof apiKeysActions;
  approvals: typeof approvals;
  executions: typeof executions;
  files: typeof files;
  "functions/cache/cleanup": typeof functions_cache_cleanup;
  "functions/cache/cleanupExpired": typeof functions_cache_cleanupExpired;
  "functions/cache/delete": typeof functions_cache_delete;
  "functions/cache/get": typeof functions_cache_get;
  "functions/cache/set": typeof functions_cache_set;
  "http/uploadFile": typeof http_uploadFile;
  http: typeof http;
  "lib/encryption": typeof lib_encryption;
  "lib/utils": typeof lib_utils;
  mcpServers: typeof mcpServers;
  "rateLimits/check": typeof rateLimits_check;
  systemApiKeys: typeof systemApiKeys;
  templates: typeof templates;
  uiBuilderConfigurations: typeof uiBuilderConfigurations;
  userLLMKeys: typeof userLLMKeys;
  userLLMKeysActions: typeof userLLMKeysActions;
  userMCPs: typeof userMCPs;
  userToolKeys: typeof userToolKeys;
  userToolKeysActions: typeof userToolKeysActions;
  users: typeof users;
  workflows: typeof workflows;
}>;
declare const fullApiWithMounts: typeof fullApi;

export declare const api: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApiWithMounts,
  FunctionReference<any, "internal">
>;

export declare const components: {};
