import { Entity, Property } from "@mikro-orm/core";
import { SubmissionEntity } from "./SubmissionEntity";
import {config} from "$lib/config";

@Entity()
export class BuildEntity extends SubmissionEntity {

    @Property({ type: "string", length: config.SUBMISSION_NAME_MAX_LENGTH })
    name!: string;

    @Property({ type: 'array', nullable: false })
    images!: string[];

    @Property({ type: "string", length: config.DOWNLOAD_LINK_MAX_LENGTH, nullable: true })
    downloadLink?: string;

    @Property({ type: "text", length: config.SUBMISSION_DESCRIPTION_MAX_LENGTH, nullable: true })
    description?: string;
}
