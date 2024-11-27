import {Submission} from "$lib/models/Submission";
import type {Profile} from "$lib/models/Profile";

export class Build extends Submission {

    // List of comments
    private comments : Array<Comment> = new Array<Comment>();

    // Presentation
    private images : Array<URL> = new Array<URL>(10); //todo
    private downloadLink : URL | null;
    private description : string | null;

    constructor(author : Profile, date : Date, name: string, downloadLink : string | null, description : string | null) {
        super(author, date, name);
        this.downloadLink = downloadLink ? new URL(downloadLink) : null;
        this.description = description;
    }

    /**
     * Retrieve all comments of the build
     */
    getComments() : Array<Comment> {
        return this.comments;
    }

    /**
     * Add a comment to the build
     * @param comment comment for the build
     */
    addComment(comment : Comment) : void {
        this.comments.push(comment);
    }

    /**
     * Retrieve all images of the build
     */
    getImages() : Array<URL> {
        return this.images;
    }

    /**
     * Add an image to the build's presentation
     * @param image image to be added
     */
    addImage(image : URL) : void {
        this.images.push(image);
    }

    /**
     * Remove an image from the build's presentation
     * @param index
     */
    removeImage(index : number) : void {
        this.images.splice(index, 1);
    }

    /**
     * Retrieve the download URL of the build
     */
    getDownloadLink() : URL | null {
        return this.downloadLink;
    }

    /**
     * Set the download link of the build
     * @param downloadLink the link of the download, null if the link is to be removed
     */
    setDownloadLink(downloadLink : URL | null) : void {
        this.downloadLink = downloadLink;
    }

    /**
     * Retrieve the description of the build
     */
    getDescription() : string {
        return this.description ? this.description : "";
    }

    /**
     * Set the description of the build
     * @param description the description of the build, null if the description is to be removed
     */
    setDescription(description : string | null) : void {
        this.description = description;
    }

    /**
     * Process of the creation of a Build submission (user is on the submission editing page)
     */
    static Builder = class {
        private author!: Profile;
        private date!: Date;
        private name!: string;
        private description!: string;
        private images: Array<URL> = [];
        private downloadLink?: URL | null;

        setAuthor(author: Profile): this {
            this.author = author;
            return this;
        }

        setDate(date: Date): this {
            this.date = date;
            return this;
        }

        setName(name: string): this {
            this.name = name;
            return this;
        }

        addImage(image: URL): this {
            this.images.push(image);
            return this;
        }

        setDownloadLink(link: URL): this {
            this.downloadLink = link;
            return this;
        }

        setDescription(description: string): this {
            this.description = description;
            return this;
        }

        build(): Build {
            if (!this.author || !this.date || !this.name) {
                throw new Error('Author, date, and name are required to create a Build.');
            }

            const build = new Build(this.author, this.date, this.name, this.downloadLink = null, this.description);
            this.images.forEach(image => build.addImage(image));

            return build;
        }
    };
}