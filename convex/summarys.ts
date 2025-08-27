import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";


export const initSummaryById = mutation({
    args: { document_id: v.id("documents"), summary_client_request_id: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const document = await ctx.db.get(args.document_id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember =
            !!(document.organizationId && document.organizationId === organizationId);

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }

        const timestamp = new Date().getTime();

        return await ctx.db.insert("summarys", {
            documentId: document._id,
            summary: "",
            summaryStatus: "pending",
            summaryUpdatedAt: timestamp,
            summaryClientRequestId: args.summary_client_request_id,
        });
    },
});

export const updateSummaryById = mutation({
    args: { id: v.id("documents"), summary: v.string(), summary_client_request_id: v.string(), summary_status: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember =
            !!(document.organizationId && document.organizationId === organizationId);

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }


        const record = await ctx.db.query("summarys")
            .filter((q) =>
                q.and(
                    q.eq(q.field("documentId"), args.id),
                    q.eq(q.field("summaryClientRequestId"), args.summary_client_request_id)
                )
            )
            .first();

        const timestamp = new Date().getTime();
        if (record) {
            await ctx.db.patch(record._id, {
                summary: args.summary,
                summaryStatus: args.summary_status,
                summaryUpdatedAt: timestamp,
                summaryClientRequestId: args.summary_client_request_id, // Update the field as well
            });
            return true;
        } else {
            throw new Error("Summary record not found for the given document and client request IDs.");
        }
    },
});


export const getSummaryByDocumentId = query({
    args: { documentId: v.id("documents") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember =
            !!(document.organizationId && document.organizationId === organizationId);

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }

        const summarys = await ctx.db.query("summarys")
            .filter((q) => q.eq(q.field("documentId"), args.documentId))
            .filter((q) => q.eq(q.field("summaryStatus"), "completed"))
            .collect();

        console.log("Fetched summarys for documentId:", args.documentId, summarys);

        const sortedSummarys = summarys
            .sort((a, b) => b.summaryUpdatedAt - a.summaryUpdatedAt);

        if (sortedSummarys.length === 0) {
            // throw new ConvexError("Summary not found");
            console.log("No summary found for documentId:", args.documentId);
            return null;
        }

        return sortedSummarys[0].summary;
    },
});


export const getSummaryAndFeedbackByDocumentId = query({
    args: { documentId: v.id("documents") },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const document = await ctx.db.get(args.documentId);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember =
            !!(document.organizationId && document.organizationId === organizationId);

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }

        const summarys = await ctx.db.query("summarys")
            .filter((q) => q.eq(q.field("documentId"), args.documentId))
            .filter((q) => q.eq(q.field("summaryStatus"), "completed"))
            .collect();

        console.log("Fetched summarys for documentId:", args.documentId, summarys);

        const sortedSummarys = summarys
            .sort((a, b) => b.summaryUpdatedAt - a.summaryUpdatedAt);

        if (sortedSummarys.length === 0) {
            // throw new ConvexError("Summary not found");
            console.log("No summary found for documentId:", args.documentId);
            return null;
        }

        return sortedSummarys[0];
    },
});

export const updateFeedbackByClientRequestId = mutation({
    args: { id: v.id("documents"), summary_client_request_id: v.string(), summary_rating: v.number() },
    handler: async (ctx, args) => {
        const user = await ctx.auth.getUserIdentity();

        if (!user) {
            throw new ConvexError("Unauthorized");
        }

        const organizationId = (user.organization_id ?? undefined) as
            | string
            | undefined;

        const document = await ctx.db.get(args.id);

        if (!document) {
            throw new ConvexError("Document not found");
        }

        const isOwner = document.ownerId === user.subject;
        const isOrganizationMember =
            !!(document.organizationId && document.organizationId === organizationId);

        if (!isOwner && !isOrganizationMember) {
            throw new ConvexError("Unauthorized");
        }


        const record = await ctx.db.query("summarys")
            .filter((q) =>
                q.and(
                    q.eq(q.field("documentId"), args.id),
                    q.eq(q.field("summaryClientRequestId"), args.summary_client_request_id)
                )
            )
            .first();

        const timestamp = new Date().getTime();
        if (record) {
            await ctx.db.patch(record._id, { // Update the field as well
                summaryRating: args.summary_rating,
            });
            return true;
        } else {
            throw new Error("Summary record not found for the given document and client request IDs.");
        }
    },
});
