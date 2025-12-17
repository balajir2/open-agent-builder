import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

/**
 * Sync user from Auth to Convex DB
 * Called on every page load/auth check to ensure user exists
 */
export const store = mutation({
    args: {
        email: v.optional(v.string()),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication detected");
        }

        const userId = identity.subject;

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", userId))
            .first();

        if (user) {
            // Update info if changed
            if (user.email !== args.email || user.name !== args.name) {
                await ctx.db.patch(user._id, {
                    email: args.email,
                    name: args.name,
                });
            }
            return user;
        }

        // Create new user
        // Default role is "user"
        // TODO: You can manually set your first admin in Convex Dashboard
        const newUserId = await ctx.db.insert("users", {
            clerkId: userId,
            email: args.email,
            name: args.name,
            role: "user",
            createdAt: new Date().toISOString(),
        });

        return await ctx.db.get(newUserId);
    },
});

/**
 * Get the current logged in user's details (including role)
 */
export const currentUser = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) return null;

        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();
    },
});

/**
 * List all users (Admin only)
 */
export const list = query({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (currentUser?.role !== "admin") {
            throw new Error("Unauthorized: Admin access required");
        }

        return await ctx.db.query("users").order("desc").collect();
    },
});

/**
 * Update user role (Admin only)
 */
export const updateRole = mutation({
    args: {
        userId: v.id("users"),
        role: v.string(), // "admin" | "user"
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Unauthorized");
        }

        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();

        if (currentUser?.role !== "admin") {
            throw new Error("Unauthorized: Admin access required");
        }

        await ctx.db.patch(args.userId, { role: args.role });
        return { success: true };
    },
});
