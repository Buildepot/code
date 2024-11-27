import type {Profile} from "$lib/models/Profile";
import {Submission} from "$lib/models/Submission";

export class Comment extends Submission {

    // Content of the comment
    private comment : string;

    // Other properties of a comment
    private replies : Comment[] = [];

    constructor(author : Profile, date : Date, comment : string) {
        super(author, date);
        this.comment = comment;
    }

    /**
     * Retrieve the comment's content
     */
    getContent() : string {
        return this.comment;
    }

    /**
     * Retrieve the replies of the comment
     */
    getReplies() : Comment[] {
        return this.replies;
    }

    /**
     * Add a reply to the comment
     * @param comment
     */
    addReply(comment : Comment) : void {
        this.replies.push(comment);
    }

    /**
     * Remove a reply from a comment
     * @param comment
     */
    removeReply(comment : Comment) : void {
        this.replies = this.replies.filter(c => c === comment);
    }
}