import { defineCollection, z } from 'astro:content';

import { glob } from 'astro/loaders';

const projects = defineCollection({ 
    loader: glob({ pattern: "*.md", base: "./src/projects" }),
    schema: z.object({
        title: z.string().max(100),
        image: z.string().url().or(z.string()), // allow relative or full URL
        description: z.string().max(300),
        link: z.string().url(),
        display: z.boolean(),
        date: z.date()
    }),
});

export const collections = { projects };