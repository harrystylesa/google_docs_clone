import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { paginationOptsValidator } from "convex/server";



export const get = query({
    args: { paginationOpts: paginationOptsValidator, search: v.optional(v.string()) },
    handler: async (ctx, args) => {
        return await ctx.db.query("documents").paginate(args.paginationOpts);
    },
});

export const create = mutation({
    args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unathorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        return await ctx.db.insert("documents", {
            title: args.title ?? "Untitled coument",
            ownerId: user.subject,
            organizationId,
            initialContent: args.initialContent,
        });
    },
});
