import type {Profile} from "$lib/models/Profile";

/**
 * All items of the platform that can be submitted by a user
 */
export abstract class Submission {

    // Metadata of the submission
    author: Profile;
    date: Date;

    protected constructor(author : Profile, date : Date) {
        this.author = author;
        this.date = date;
    }

    getAuthor(): Profile {
        return this.author;
    }

    getDate(): Date {
        return this.date;
    }
}