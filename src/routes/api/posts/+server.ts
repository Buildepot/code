import {json} from "@sveltejs/kit";
import { ValidationError } from "../../../errors/ValidationError";

export const POST = async ({ request }) => {
    const {comment, author} : { comment : string, author : string } = await request.json();

    // Validate that the comment is not purely whitespaces/empty
    const trimmedComment : string = comment.trim();
    if (!trimmedComment) {
        throw new ValidationError("Comment cannot be empty or whitespace only.");
    }

    // Proceed with saving the comment
    return new Response(JSON.stringify({ message: `Success ${trimmedComment}` }), { status : 201});
};