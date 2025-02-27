import { SubmissionEntity } from "$lib/db/entities/SubmissionEntity";
import { Factory } from "@mikro-orm/seeder";
import { faker } from "@faker-js/faker";
import type { EntityData } from "@mikro-orm/core";
import {ProfileFactory} from "./ProfileFactory";

export abstract class SubmissionFactory<T extends SubmissionEntity> extends Factory<T> {

    protected baseDefinition(): Partial<EntityData<SubmissionEntity>> {
        return {
            author: new ProfileFactory(this.em).makeOne(),
            date: faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2025-02-01T00:00:00.000Z' }),
            likes: faker.number.int({ min: 0, max: 1000 }),
        };
    }
}
