import { config } from '$lib/config';

export const POST = async ({ request }) => {
    const {
        name,
        author,
        description,
        downloadLink,
        images,
    }: {
        name: string;
        author: string
        description: string;
        downloadLink: string;
        images: string[];
    } = await request.json();

    // Validate required fields
    if (!name || !author) {
        return new Response(JSON.stringify({ message: "Name, author, and download link are required." }),
            { status: 400 });
    }

    // todo validation: there must be at-least 1 image

    // Validate name length
    if (name.length > config.SUBMISSION_NAME_MAX_LENGTH) {
        return new Response(
            JSON.stringify({ message: `Build name cannot exceed ${config.SUBMISSION_NAME_MAX_LENGTH} characters.` }),
            { status: 400 }
        );
    }

    // Validate description length
    if (description.length > config.SUBMISSION_DESCRIPTION_MAX_LENGTH) {
        return new Response(
            JSON.stringify({
                message: `Description cannot exceed ${config.SUBMISSION_DESCRIPTION_MAX_LENGTH} characters.`,
            }),
            { status: 400 }
        );
    }

    // Validate download link format (basic validation)
    try {
        new URL(downloadLink);
    } catch {
        return new Response(JSON.stringify({ message: "Invalid download link URL." }), { status: 400 });
    }

    // Proceed with saving the build
    // todo
    return new Response(
        JSON.stringify({ message: `Build posted successfully: ${name} by ${author}` }),
        { status: 201 }
    );
};
