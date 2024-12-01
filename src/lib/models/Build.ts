import {Submission} from "$lib/models/Submission";
import type {Profile} from "$lib/models/Profile";

/**
 * Builds are submissions featuring Minecraft creations
 */
export class Build extends Submission {

    // Presentation
    private name : string;
    private images : Array<URL> = new Array<URL>(10); //todo
    private downloadLink : URL | null;
    private description : string | null;

    constructor(author : Profile, date : Date, name: string, downloadLink : string | null = null, description : string | null = null) {
        super(author, date);
        this.name = name;
        this.downloadLink = downloadLink ? new URL(downloadLink) : null;
        this.description = description;
    }

    /**
     * Retrieve the name of the build
     */
    getName() : string {
        return this.name;
    }

    /**
     * Set the name of the build
     */
    setName(name : string): void {
        this.name = name;
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
}