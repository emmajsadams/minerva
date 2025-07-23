import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const createTask = mutation({
  args: {
    name: v.string(),
    status: v.union(
      v.literal("todo"),
      v.literal("in_progress"),
      v.literal("done")
    ),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const now = Date.now();

    return await ctx.db.insert("tasks", {
      ...args,
      userId,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    name: v.optional(v.string()),
    status: v.optional(
      v.union(v.literal("todo"), v.literal("in_progress"), v.literal("done"))
    ),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    dueDate: v.optional(v.string()),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const { id, ...updates } = args;

    // Verify the task belongs to the authenticated user
    const existingTask = await ctx.db.get(id);
    if (!existingTask || existingTask.userId !== userId) {
      throw new Error("Task not found or access denied");
    }

    return await ctx.db.patch(id, {
      ...updates,
      updatedAt: Date.now(),
    });
  },
});

export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    // Verify the task belongs to the authenticated user
    const existingTask = await ctx.db.get(args.id);
    if (!existingTask || existingTask.userId !== userId) {
      throw new Error("Task not found or access denied");
    }

    // Soft delete by setting deleted flag
    return await ctx.db.patch(args.id, {
      deleted: true,
      updatedAt: Date.now(),
    });
  },
});

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return [];
    }

    const allTasks = await ctx.db
      .query("tasks")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();

    // Filter out deleted tasks
    const activeTasks = allTasks.filter((task) => !task.deleted);

    // Sort by: 1) date (oldest first), 2) priority (high->medium->low), 3) name
    return activeTasks.sort((a, b) => {
      // Helper function to convert priority to number for sorting
      const priorityOrder = { high: 3, medium: 2, low: 1 };

      // 1. Sort by due date (oldest first)
      // Tasks without due dates should come after tasks with due dates
      const aDate = a.dueDate
        ? new Date(a.dueDate).getTime()
        : Number.MAX_SAFE_INTEGER;
      const bDate = b.dueDate
        ? new Date(b.dueDate).getTime()
        : Number.MAX_SAFE_INTEGER;

      if (aDate !== bDate) {
        return aDate - bDate; // oldest first
      }

      // 2. Sort by priority (high -> medium -> low)
      const aPriority = priorityOrder[a.priority] || 0;
      const bPriority = priorityOrder[b.priority] || 0;

      if (aPriority !== bPriority) {
        return bPriority - aPriority; // high priority first
      }

      // 3. Sort by name (alphabetically)
      return a.name.localeCompare(b.name);
    });
  },
});

export const getTask = query({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      throw new Error("Not authenticated");
    }

    const task = await ctx.db.get(args.id);
    if (!task || task.userId !== userId) {
      throw new Error("Task not found or access denied");
    }

    return task;
  },
});
