import {Submission} from "$lib/models/Submission";
import type {Profile} from "$lib/models/Profile";

export class Build extends Submission {

    // List of comments
    private comments : Array<Comment> = new Array<Comment>();
    private likes : number = 0;

    constructor(author : Profile, date : Date) {
        super(author, date);
    }

    /**
     * Retrieve the number of likes of the build
     */
    getLikes() : number {
        return this.likes;
    }

    /**
     * Add a like to the build
     */
    addLike() : void {
        this.likes += 1;
    }

    /**
     * Retrieve all comments of the build
     */
    getComments() : Array<Comment> {
        return this.comments;
    }

    /**
     * Add a comment to the build
     * @param comment comment for a build
     */
    addComment(comment : Comment) : void {
        this.comments.push(comment);
    }

}