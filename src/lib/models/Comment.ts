import type {Profile} from "$lib/models/Profile";
import {Submission} from "$lib/models/Submission";
import { json, error } from '@sveltejs/kit';
import {ValidationError} from "../../errors/ValidationError";

export class Comment extends Submission {

    // Content of the comment
    private comment : string;

    // Replies/sub-comments
    private replies : Comment[] = [];

    constructor(author : Profile, date : Date, comment : string) {
        super(author, date);
        this.comment = comment;
    }

    getComment() : string {
        return this.comment;
    }

    getReplies() : Comment[] {
        return this.replies;
    }

    addReply(comment : Comment) : void {
        this.replies.push(comment);
    }

    removeReply(comment : Comment) : void {
        this.replies = this.replies.filter(c => c === comment);
    }

}