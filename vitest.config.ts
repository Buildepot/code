import { defineConfig } from 'vitest/config';
import {sveltekit} from "@sveltejs/kit/vite";
import viteConfig from "./vite.config";

export default defineConfig({
    ...viteConfig,
    test: {
        globals: true,
        environment: 'node',
        include: ['tests/**/*.test.ts'],
    },
});
