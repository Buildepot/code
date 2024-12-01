import type {Profile} from "$lib/models/Profile";

export class Notification {

    private id : string;
    private profile : Profile;
    private type : NotificationType;
    private body : string | null;
    private read : boolean;

    constructor(id: string, profile : Profile, type : NotificationType, body : string | null = null) {
        this.id = id;
        this.profile = profile;
        this.type = type;
        this.body = body;
        this.read = false;
    }

    /**
     * Retrieve the ID of the notification
     */
    getId() : string {
        return this.id;
    }

    /**
     * Retrieve the profile/user to whom the notification belongs
     */
    getProfile() : Profile {
        return this.profile;
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
}

export enum NotificationType {
    LIKES,
    SUBSCRIBERS,
    SUBSCRIPTION,
    INFO,
    COMMENT
}