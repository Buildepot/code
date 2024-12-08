import { POST } from '../../../src/routes/api/comments/+server';
import { describe, expect, test } from 'vitest';
import { config } from '$lib/config';

const url = new URL('http://localhost/api/comments');

describe('missingArguments', () => {
    test('missingAllFields', async () => {
        const request = {
            json: async () => ({})
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingAuthor', async () => {
        const request = {
            json: async () => ({
                body: 'This is a comment',
                parent: 'superComment'
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingParent', async () => {
        const request = {
            json: async () => ({
                body: 'This is a comment',
                author: 'Steve'
            })
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('missingBody', async () => {
        const request = {
            json: async () => ({
                author: 'Steve',
                parent: 'superComment'
            })
        }

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    })
});

describe('argumentContent', async () => {
    test('whiteSpaceBody', async () => {
        const request = {
            json: async () => ({
                body: '',
                author: 'Steve',
                parent: 'superComment'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    test('longBody', async () => {
        // Generate a Description longer than the maximal name length
        let commentStr : String = "";
        for (let i : number = 0; i <= config.COMMENT_MAX_LENGTH; i++) {
            commentStr += 'A';
        }

        const request = {
            json: async () => ({
                body: commentStr,
                author: 'Steve',
                parent: 'superComment'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(400);
    });

    // todo: parent existence
});

describe('validRequests', async () => {
    test('validFields', async () => {
        const request = {
            json: async () => ({
                body: 'Nice looking build!',
                author: 'Steve',
                parent: 'superComment'
            }),
        };

        const response = await POST({ request, url } as any);

        expect(response.status).toBe(201);
    });
});