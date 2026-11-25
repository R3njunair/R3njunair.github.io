import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    company: z.string(),
    title: z.string(),
    location: z.string().optional(),
    startDate: z.string(),
    endDate: z.string(),
    titlesWorkedOn: z.array(z.string()).optional(),
    order: z.number(),
  }),
});

const impact = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/impact' }),
  schema: z.object({
    title: z.string(),
    company: z.string(),
    metric: z.string(),
    order: z.number(),
  }),
});

export const collections = { experience, impact };
