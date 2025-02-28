import {Factory} from "@mikro-orm/seeder";
import {faker} from "@faker-js/faker";
import {ProfileEntity} from "$lib/db/entities/ProfileEntity";
import {BuildFactory} from "./BuildFactory";

export class ProfileFactory extends Factory<ProfileEntity> {
    model = ProfileEntity;

    definition(): Partial<ProfileEntity> {
        return {
            date: faker.date.between({from: '2020-01-01T00:00:00.000Z', to: '2025-02-01T00:00:00.000Z'}),
            name: faker.person.firstName(),
            email: faker.internet.email(),
        };
    }

    makeOne(): ProfileEntity {
        const profile = super.makeOne();

        // Attach submissions
        profile.submissions = new BuildFactory(this.em).make(faker.number.int({ min: 1, max: 5 }));

        // Generate additional profiles for relationships (subscribers & subscriptions)
        const relatedProfiles = this.make(faker.number.int({ min: 3, max: 6 }));

        // Assign relationships
        profile.subscribers = faker.helpers.arrayElements(relatedProfiles, faker.number.int({ min: 1, max: 3 }));
        profile.subscriptions = faker.helpers.arrayElements(relatedProfiles, faker.number.int({ min: 1, max: 3 }));

        return profile;
    }
}