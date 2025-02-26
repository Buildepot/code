import type {Profile} from "$lib/models/Profile";
import {Submission} from "$lib/models/Submission";
import {config} from "$lib/config";

/**
 * Comment on a submission or a reply to a parent comment
 */
export class Comment extends Submission {

    // Properties of a comment
    private parent : Submission;
    private body : string; // Content of the comment

    constructor(id : number, author : Profile, date : Date, parent : Submission, body : string) {
        super(id, author, date);
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

    /**
     * Create a new empty SQL table of the Comment model
     */
    static createTableSQL(): string {
        return `
      CREATE TABLE IF NOT EXISTS comments (
        id INT PRIMARY KEY REFERENCES submissions(id),
        parent_id INT NOT NULL REFERENCES submissions(id),
        body VARCHAR(${config.COMMENT_MAX_LENGTH}) NOT NULL,
      );
    `;
    }
}