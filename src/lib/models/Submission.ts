import type {Profile} from "$lib/models/Profile";

/**
 * All items of the platform that can be submitted by a user
 */
export abstract class Submission {

    // Metadata of the submission
    author : Profile;
    date : Date;

    // Likes for a submission (rating)
    likes : number = 0;

    // List of comments
    private comments : Comment[] = [];

    protected constructor(author : Profile, date : Date) {
        this.author = author;
        this.date = date;
    }

    /**
     * Retrieve the author of the submission
     */
    getAuthor() : Profile {
        return this.author;
    }

    /**
     * Retrieve the date when the submission was submitted
     */
    getDate() : Date {
        return this.date;
    }

    /**
     * Retrieve the number of likes (rating) of the submission
     */
    getLikes() : number {
        return this.likes;
    }

    /**
     * Add a like to the submission
     */
    addLike() : void {
        this.likes += 1;
    }

    /**
     * Remove a like from the submission
     */
    removeLike() : void {
        this.likes -= 1;
    }

    /**
     * Retrieve the replies of the comment
     */
    getReplies() : Comment[] {
        return this.comments;
    }

    /**
     * Add a reply to the comment
     * @param comment
     */
    addReply(comment : Comment) : void {
        this.comments.push(comment);
    }

    /**
     * Remove a reply from a comment
     * @param comment
     */
    removeReply(comment : Comment) : void {
        this.comments = this.comments.filter(c => c === comment);
    }
}