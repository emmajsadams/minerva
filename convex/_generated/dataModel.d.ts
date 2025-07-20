/* eslint-disable */
/**
 * Generated data model types.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { AnyDataModel } from "convex/server";
import type { GenericId } from "convex/values";

/**
 * No `schema.ts` file found!
 *
 * This generated code has permissive types like `Doc = any` because Convex doesn't know
 * your schema. If you'd like more type safety, see https://docs.convex.dev/database/schemas.
 *
 * To generate this code with type-safe document types from your schema, create a schema file at `convex/schema.ts`.
 */

/**
 * The names of all of your Convex tables.
 */
export declare const tableNames: any;

/**
 * The type of a document stored in Convex.
 */
export type Doc<TableName extends string = string> = any;

/**
 * An identifier for a document in Convex.
 *
 * Convex documents are uniquely identified by their `Id`, which is accessible
 * on the `_id` field. To learn more, see https://docs.convex.dev/database/document-ids.
 *
 * Documents can be loaded using `db.get(id)` in query and mutation functions.
 *
 * IDs are just strings at runtime, but this type can be used to distinguish
 * them from other strings when type-checking.
 */
export type Id<TableName extends string = string> = GenericId<TableName>;

/**
 * A type describing your Convex data model.
 *
 * This type includes information about what tables you have, the type of
 * documents stored in those tables, and the indexes defined on them.
 *
 * This type is used to parameterize methods like `queryGeneric` and
 * `mutationGeneric` to make them type-safe.
 */
export interface DataModel extends AnyDataModel {
  [key: string]: any;
}