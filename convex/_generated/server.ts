/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  action,
  internalAction,
  internalMutation,
  internalQuery,
  mutation,
  query,
} from "convex/server";
import type {
  ActionBuilder,
  MutationBuilder,
  QueryBuilder,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

/**
 * Define a query in this Convex app's public API.
 *
 * This function will be allowed to read your Convex database and will be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to add it to your app's API.
 */
export const query = query as QueryBuilder<DataModel, "public">;

/**
 * Define a mutation in this Convex app's public API.
 *
 * This function will be allowed to modify your Convex database and will be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to add it to your app's API.
 */
export const mutation = mutation as MutationBuilder<DataModel, "public">;

/**
 * Define an action in this Convex app's public API.
 *
 * An action can run arbitrary JavaScript code, including non-deterministic
 * code and code with side-effects. Actions can also call third party APIs.
 * Actions are executed in a Node.js environment and can interact with the
 * database indirectly by calling queries and mutations using the provided
 * `ActionCtx` object. Actions need to be defined in files inside a `convex/`
 * folder. Actions can be called from the client using the generated client
 * code.
 *
 * @param func - The action function. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to add it to your app's API.
 */
export const action = action as ActionBuilder<DataModel, "public">;

/**
 * Define an internal query to be used within other Convex functions.
 */
export const internalQuery = internalQuery as QueryBuilder<DataModel, "internal">;

/**
 * Define an internal mutation to be used within other Convex functions.
 */
export const internalMutation = internalMutation as MutationBuilder<DataModel, "internal">;

/**
 * Define an internal action to be used within other Convex functions.
 */
export const internalAction = internalAction as ActionBuilder<DataModel, "internal">;