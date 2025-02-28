import { Entity, ManyToOne, Property, type Rel } from '@mikro-orm/core';
import { SubmissionEntity } from './SubmissionEntity';
import { config } from "$lib/config";

@Entity()
export class CommentEntity extends SubmissionEntity {

    @ManyToOne(() => 'SubmissionEntity')
    parentSubmission!: Rel<SubmissionEntity>;

    @Property({ type: "string", length: config.COMMENT_MAX_LENGTH })
    body!: string;
}
