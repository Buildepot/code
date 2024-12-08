import { describe, expect, test } from 'vitest';
import { POST } from '../../../src/routes/api/builds/+server';
import { config } from '$lib/config';

const url = new URL('http://localhost/api/builds');

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
                author: 'Steve'
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingAuthor', async () => {
        const request = {
            json: async () => ({
                name: 'A Minecraft Build'
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
                name: '',
                author: '',
                description: '',
                downloadLink: '',
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('longName', async () => {
        // Generate a Name longer than the maximal name length
        let nameStr : String = "";
        for (let i : number = 0; i <= config.SUBMISSION_NAME_MAX_LENGTH; i++) {
            nameStr += 'A';
        }

        const request = {
            json: async () => ({
                name: nameStr,
                author: 'Steve',
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('longDescription', async () => {
        // Generate a Description longer than the maximal name length
        let descStr : String = "";
        for (let i : number = 0; i <= config.SUBMISSION_DESCRIPTION_MAX_LENGTH; i++) {
            descStr += 'A';
        }

        const request = {
            json: async () => ({
                name: 'A Minecraft Build',
                author: 'Steve',
                description: descStr,
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('validURL', async () => {
        const request = {
            json: async () => ({
                name: 'A Minecraft Build',
                author: 'Steve',
                downloadLink: 'https://www.minecraft.net'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(201);
    });

    test('invalidURL', async () => {
        const request = {
            json: async () => ({
                name: 'A Minecraft Build',
                author: 'Steve',
                downloadLink: 'I am a very invalid URL'
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
                name: 'A Minecraft Build',
                author: 'Steve'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(201);
    });
});