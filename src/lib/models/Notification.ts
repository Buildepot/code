import type {Profile} from "$lib/models/Profile";

export class Notification {

    private id : number;
    private profile : Profile;
    private date : Date;
    private type : NotificationType;
    private body : string | null;
    private read : boolean;

    constructor(id : number, profile : Profile, date: Date, type : NotificationType, body : string | null = null) {
        this.id = id;
        this.profile = profile;
        this.date = date;
        this.type = type;
        this.body = body;
        this.read = false;
    }

    /**
     * Retrieve the ID of the notification
     */
    getId() : number {
        return this.id;
    }

    /**
     * Retrieve the profile/user to whom the notification belongs
     */
    getProfile() : Profile {
        return this.profile;
    }

    /**
     * Retrieve the date of the notification's creation
     */
    getDate() : Date {
        return this.date;
    }

    /**
     * Retrieve the type of the notification
     */
    getType() : NotificationType {
        return this.type;
    }

    /**
     * Retrieve the body of the notification (its text contents)
     */
    getBody() : string | null{
        return this.body;
    }

    /**
     * Has this notification been marked as read?
     */
    isRead(): boolean {
        return this.read;
    }

    /**
     * Mark the notification as read
     */
    setRead() {
        this.read = true;
    }

    /**
     * Create a new empty SQL table of the Notification model
     */
    static createTableSQL(): string {
        const notificationTypes : string = Object.values(NotificationType).map((value) => `'${value.toString().toLowerCase()}'`).join(', ');

        return `
      CREATE TYPE notification_type AS ENUM (${notificationTypes});
      
      CREATE TABLE IF NOT EXISTS comments (
        id SERIAL PRIMARY KEY,
        profile_id INT NOT NULL REFERENCES profiles(id),
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        type notification_type NOT NULL,
        body TEXT,
        read BOOLEAN
      );
    `;
    }
}

export enum NotificationType {
    LIKES,
    SUBSCRIBERS,
    SUBSCRIPTION,
    INFO,
    COMMENT
}