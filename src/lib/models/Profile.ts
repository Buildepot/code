import type {Submission} from "$lib/models/Submission";
import {config} from "../config";

/**
 * The user
 */
export class Profile {

    // Fundamental details
    private id : number;
    private date : Date;
    private name : string;
    private email : string;

    // todo linked accounts from 3rd parties

    // Other details
    private submissions : Submission[] = [];
    private subscribers : Profile[] = [];
    private subscriptions : Profile[] = [];

    constructor(id : number, date : Date, name : string, email : string) {
        this.id = id;
        this.date = date;
        this.name = name;
        this.email = email;
    }

    /**
     * Retrieve the ID of the user
     */
    getId() : number {
        return this.id;
    }

    /**
     * Retrieve the creation date of the user's profile
     */
    getCreationDate() : Date {
        return this.date;
    }

    /**
     * Retrieve the name of the user
     */
    getName() : string {
        return this.name;
    }

    /**
     * Retrieve the email of the user
     */
    getEmail() : string {
        return this.email;
    }

    /**
     * Retrieve all submissions made by the user
     */
    getSubmissions() : Submission[] {
        return Array.from(this.submissions);
    }

    /**
     * Retrieve all subscribers of the user
     */
    getSubscribers() : Profile[] {
        return Array.from(this.subscribers);
    }

    /**
     * Retrieve all the profiles the user is subscribed to
     */
    getSubscriptions() : Profile[] {
        return Array.from(this.subscriptions);
    }
}