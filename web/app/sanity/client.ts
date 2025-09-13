import { createClient } from '@sanity/client';

declare global {
    interface Window {
        ENV: {
            VITE_SANITY_PROJECT_ID: string;
            VITE_SANITY_DATASET: string;
            VITE_SANITY_STUDIO_URL: string;
        };
    }
}

const env = typeof document === 'undefined' ? import.meta.env : window.ENV;

export const client = createClient({
    projectId: env.VITE_SANITY_PROJECT_ID!,
    dataset: env.VITE_SANITY_DATASET!,
    apiVersion: '2024-12-01',
    useCdn: true,
    stega: {
        studioUrl: env.VITE_SANITY_STUDIO_URL
    }
});
