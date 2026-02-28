import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const productsCollection = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/products" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: z.string(),
        tags: z.array(z.string()),
        link: z.string().optional(),
        noindex: z.boolean().optional().default(false),
        nofollow: z.boolean().optional().default(false),
    }),
});

export const collections = {
    'products': productsCollection,
};
