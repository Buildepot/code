import { config } from '$lib/config';

export const POST = async ({ request }) => {
    const {
        comment,
        author
    }: { comment : string, author : string } = await request.json();

    // Validate required fields
    if (!comment || !author) {
        return new Response(JSON.stringify({ message: "Comment and author are required." }), { status : 400 })
    }

    // Validate that the comment is not purely whitespaces/empty
    const trimmedComment : string = comment.trim();
    if (!trimmedComment) {
        return new Response(JSON.stringify({ message: "Comment cannot be empty or whitespace only." }), { status : 400 });
    }

    // Validate the comment length
    // todo account for premium users
    if (trimmedComment.length > config.COMMENT_MAX_LENGTH) {
        return new Response(JSON.stringify({ message: `Comments cannot exceed ${config.COMMENT_MAX_LENGTH} characters"` }), { status : 400 });
    }

    // Proceed with saving the comment
    // todo
    return new Response(JSON.stringify({ message: `Comment posted successfully ${trimmedComment}` }), { status : 201 });
};