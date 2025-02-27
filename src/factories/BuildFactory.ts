import {faker} from "@faker-js/faker";
import {BuildEntity} from "$lib/db/entities/BuildEntity";
import {ProfileFactory} from "./ProfileFactory";
import {SubmissionFactory} from "./SubmissionFactory";
import type {EntityData, EntityManager} from "@mikro-orm/core";
import type {ProfileEntity} from "$lib/db/entities/ProfileEntity";

export class BuildFactory extends SubmissionFactory<BuildEntity> {
    model = BuildEntity;

    constructor(em: EntityManager, private profiles?: ProfileEntity[]) {
        super(em);
    }

    definition(): Partial<EntityData<BuildEntity>> {
        return {
            ...this.baseDefinition(),
            name: faker.location.city(),
            images: Array.from({length: 3}, () => faker.image.url()),
            downloadLink: faker.image.url(),
            description: faker.lorem.sentence(),
        };
    }

    makeOne(): BuildEntity {
        const build = super.makeOne();

        // Assign a random author, preferably one that already exists (created during Profile seeding)
        if (this.profiles && this.profiles.length > 0) {
            build.author = faker.helpers.arrayElement(this.profiles);
        } else {
            build.author = new ProfileFactory(this.em).makeOne();
        }

        return build;
    }
}