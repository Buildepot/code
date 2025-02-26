import { Entity, PrimaryKey, Property, OneToMany } from '@mikro-orm/core';
import { SubmissionEntity } from './SubmissionEntity';

@Entity({ tableName: 'profiles' }) // Maps to "profiles" table
export class ProfileEntity {
    @PrimaryKey({type: "number"})
    id!: number;

    @Property({type: "string"})
    name!: string;

    @Property({type: "string"})
    email!: string;

    @OneToMany(() => SubmissionEntity, (submission) => submission.author)
    submissions = new Array<SubmissionEntity>();
}
