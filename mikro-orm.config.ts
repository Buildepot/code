import { MikroORM } from '@mikro-orm/core';
import { defineConfig } from '@mikro-orm/postgresql';
import dotenv from "dotenv";
import {SeedManager} from "@mikro-orm/seeder";

// Decide which environment to use depending on the context (prod., test, ...)
const envFile = process.env.NODE_ENV === 'test' ? '.env.test' : '.env';
dotenv.config({ path: envFile });

/**
 * Retrieve an environment variable
 * @param name of the environment variable to get
 */
function getEnvVar(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Environment variable ${name} is not set`);
    }
    return value;
}

export default defineConfig({
    //type: 'postgresql',
    host: getEnvVar('POSTGRES_HOST'),
    port: parseInt(getEnvVar('POSTGRES_PORT')),
    user: getEnvVar('POSTGRES_USER'),
    password: getEnvVar('POSTGRES_PASSWORD'),
    dbName: getEnvVar('POSTGRES_DB'),
    entities: ['src/lib/db/entities/*.ts'],
    entitiesTs: ['src/lib/db/entities/*.ts'], // for CLI
    discovery: {
        warnWhenNoEntities: false,
        requireEntitiesArray: false,
    },
    migrations: {
        path: 'src/lib/db/migrations',
        pathTs: 'src/lib/db/migrations', // For TS migration files
    },
    pool: {
        min: 2,
        max: 10, // Internal connection pooling
    },
    extensions: [SeedManager],
    seeder: {
        path: './src/seeders',
        defaultSeeder: 'DatabaseSeeder',
    },
    //tsNode: true,
}) as Parameters<typeof MikroORM.init>[0];