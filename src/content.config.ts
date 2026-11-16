import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { lessonIds } from './data/course';
import { locales } from './i18n/locales';

const lessons = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/lessons' }),
  schema: z.object({
    lessonId: z.enum(lessonIds),
    locale: z.enum(locales),
    title: z.string().min(1),
    description: z.string().min(1),
    question: z.string().min(1),
    example: z.string().min(1),
    takeaway: z.string().min(1),
    curious: z.string().min(1),
    sourceIds: z.array(z.string()).min(1),
    updated: z.string(),
  }),
});

export const collections = { lessons };
