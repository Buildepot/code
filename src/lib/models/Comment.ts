import type {Profile} from "$lib/models/Profile";
import {Submission} from "$lib/models/Submission";

/**
 * Comment on a submission or a reply to a parent comment
 */
export class Comment extends Submission {

    // Properties of a comment
    private parent : Submission;
    private body : string; // Content of the comment

    constructor(author : Profile, date : Date, parent : Submission, body : string) {
        super(author, date);
        this.parent = parent;
        this.body = body;
    }

    /**
     * Retrieve the parent submission
     */
    getParent() : Submission {
        return this.parent;
    }

    /**
     * Retrieve the comment's content
     */
    getContent() : string {
        return this.body;
    }
}