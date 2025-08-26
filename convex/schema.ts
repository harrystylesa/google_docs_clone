import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    documents: defineTable({
        title: v.string(),
        initialContent: v.optional(v.string()),
        ownerId: v.string(),
        roomId: v.optional(v.string()),
        organizationId: v.optional(v.string()),
        status: v.optional(v.string()),
    })
        .index("by_owner_id", ["ownerId"])
        .index("by_organization_id", ["organizationId"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["ownerId", "organizationId"],
        }),

    summarys: defineTable({
        documentId: v.id("documents"),
        summary: v.optional(v.string()),
        summaryClientRequestId: v.string(),
        summaryRating: v.optional(v.number()),
        summaryStatus: v.optional(v.string()),
        summaryUpdatedAt: v.number(),
    })
        .index("by_document_id", ["documentId"])
});