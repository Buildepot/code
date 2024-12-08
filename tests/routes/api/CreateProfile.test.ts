import { POST } from '../../../src/routes/api/profiles/+server';
import { describe, expect, test } from 'vitest';
import { config } from '$lib/config';

const url = new URL('http://localhost/api/profiles');

describe('missingArguments', () => {
    test('missingAllFields', async () => {
        const request = {
            json: async () => ({})
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingName', async () => {
        const request = {
            json: async () => ({
                email: 'steve@minecraft.com'
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingEmail', async () => {
        const request = {
            json: async () => ({
                name: 'Steve'
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });
});

describe('argumentContent', async () => {
    test('whiteSpaceName', async () => {
        const request = {
            json: async () => ({
                author: 'Steve',
                email: 'steve@minecraft.com'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('longName', async () => {
        // Generate a Description longer than the maximal name length
        let nameStr : String = "";
        for (let i : number = 0; i <= config.PROFILE_NAME_MAX_LENGTH; i++) {
            nameStr += 'A';
        }

        const request = {
            json: async () => ({
                body: nameStr,
                email: 'steve@minecraft.com'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });
});

describe('validRequests', async () => {
    test('validFields', async () => {
        const request = {
            json: async () => ({
                name: 'Steve',
                email: 'steve@minecraft.com'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(201);
    });
});