import { config } from '$lib/config';

/**
 * Create a User Profile
 * @param request
 * @constructor
 */
export const POST = async ({ request }) => {
    const {
        name,
        email
    }: { name : string, email : string } = await request.json();

    // Validate required fields
    if (!name || !email) {
        return new Response(JSON.stringify({ message: "Name and email are required." }), { status : 400 })
    }

    // Validate the length of the name
    const trimmedName : string = name.trim();
    if (!trimmedName) {
        return new Response(JSON.stringify({ message: "Comment cannot be empty or whitespace only." }), { status : 400 });
    }

    // Validate the name length
    if (name.length > config.COMMENT_MAX_LENGTH) {
        return new Response(JSON.stringify({ message: `Name cannot exceed ${config.NAME_MAX_LENGTH} characters.` }),
            { status : 400 });
    }

    // Proceed with saving the user
    // todo
    return new Response(JSON.stringify({ message: `Comment posted successfully ${name}` }), { status : 201 });
};