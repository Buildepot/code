import type {Profile} from "$lib/models/Profile";

/**
 * All items of the platform that can be submitted by a user
 */
export abstract class Submission {

    // Metadata of the submission
    author : Profile;
    date : Date;
    name : string;

    // Likes for a submission (rating)
    likes : number = 0;

    protected constructor(author : Profile, date : Date, name : string) {
        this.author = author;
        this.date = date;
        this.name = name;
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
     * Retrieve the name of the submission
     */
    getName() : string {
        return this.name;
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
}