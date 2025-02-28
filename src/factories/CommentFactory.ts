import {Factory} from "@mikro-orm/seeder";
import {CommentEntity} from "$lib/db/entities/CommentEntity";
import {faker} from "@faker-js/faker";
import {SubmissionEntity} from "$lib/db/entities/SubmissionEntity";
import {ProfileFactory} from "./ProfileFactory";
import {BuildFactory} from "./BuildFactory";
import type {EntityData, EntityManager} from "@mikro-orm/core";
import {SubmissionFactory} from "./SubmissionFactory";
import type {ProfileEntity} from "$lib/db/entities/ProfileEntity";

export class CommentFactory extends SubmissionFactory<CommentEntity> {
    model = CommentEntity;

    constructor(em: EntityManager, private profiles?: ProfileEntity[], private submissions?: SubmissionEntity[]) {
        super(em);
    }

    definition(): Partial<EntityData<CommentEntity>> {
        return {
            ...this.baseDefinition(),
            body: faker.lorem.sentence({ min: 10, max: 50 }),
        };
    }

    makeOne(): CommentEntity {
        const comment = super.makeOne();

        // Assign an author: Use an existing profile if available, otherwise create a new one
        if (this.profiles && this.profiles.length > 0) {
            comment.author = faker.helpers.arrayElement(this.profiles);
        } else {
            comment.author = new ProfileFactory(this.em).makeOne();
        }

        // Assign a parent submission: Use an existing submission if available, otherwise create a new one
        if (this.submissions && this.submissions.length > 0) {
            comment.parentSubmission = faker.helpers.arrayElement(this.submissions);
        } else {
            comment.parentSubmission = new BuildFactory(this.em).makeOne();
        }

        return comment;
    }
}