import type {Submission} from "$lib/models/Submission";

export class Profile {

    // Fundamental details
    private id: number;
    private name: string;
    private email: string;

    // todo linked accounts from 3rd parties

    // Other details
    private submissions : Submission[] = [];
    private comments : Comment[] = [];
    private subscribers : Profile[] = [];
    private subscriptions : Profile[] = [];

    constructor(id : number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    /**
     * Retrieve the
     */
    getSubmissions() : Submission[] {
        return Array.from(this.submissions);
    }


}