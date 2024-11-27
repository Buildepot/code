import { config } from '$lib/config';

/**
 * Submit a Comment
 * @param request
 * @constructor
 */
export const POST = async ({ request }) => {
    const {
        body,
        author,
        parent
    }: { body : string, author : string, parent : string } = await request.json();

    // Validate the existence of the parent submission
    // todo validation: parent exists in the database

    // Validate required fields
    if (!body || !author || !parent) {
        return new Response(JSON.stringify({ message: "Comment Body, author and parent are required." }), { status : 400 })
    }

    // Validate that the comment is not purely whitespaces/empty
    const trimmedComment : string = body.trim();
    if (!trimmedComment) {
        return new Response(JSON.stringify({ message: "Comment cannot be empty or whitespace only." }), { status : 400 });
    }

    // Validate the comment length
    // todo account for premium users
    if (body.length > config.COMMENT_MAX_LENGTH) {
        return new Response(JSON.stringify({ message: `Comments cannot exceed ${config.COMMENT_MAX_LENGTH} characters"` }), { status : 400 });
    }

    // Proceed with saving the comment
    // todo save the comment to the database
    return new Response(JSON.stringify({ message: `Comment posted successfully ${body}` }), { status : 201 });
};