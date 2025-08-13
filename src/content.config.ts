// 1. Import utilities from `astro:content`
import { defineCollection, z } from 'astro:content';

// 2. Import loader(s)
import { glob, file } from 'astro/loaders';

// 3. Define your collection(s)
const projects = defineCollection({ 
    loader: glob({ pattern: "**/*.md", base: "./src/projects" }),
    schema: z.object({
        title: z.string(),
        image: z.string().url().or(z.string()), // allow relative or full URL
        description: z.string().max(300),
    }),
});

// 4. Export a single `collections` object to register your collection(s)
export const collections = { projects };