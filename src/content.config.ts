import { defineCollection } from 'astro:content';
import { glob, file } from 'astro/loaders';
import { z } from 'astro/zod';

const AREAS = ['RTL', 'Verification', 'FPGA', 'Arch', 'EDA/PPA'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    areas: z.array(z.enum(AREAS)).default([]),
    status: z.enum(['active', 'done', 'paused']).default('active'),
    start: z.string().optional(), // "2026-09"
    end: z.string().optional(),
    repo: z.string().url().optional(),
    contributors: z.array(z.object({ name: z.string(), role: z.string() })).default([]),
    order: z.number().default(100),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    author: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({ title: z.string(), description: z.string().optional() }),
});

const members = defineCollection({
  loader: file('./src/data/members.yaml'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    contributions: z.array(z.string()).default([]),
    status: z.enum(['active', 'former']).default('active'),
    until: z.string().optional(),
    order: z.number().default(100),
    study: z.array(z.object({ label: z.string(), href: z.string().startsWith('/') })).default([]),
    interests: z.array(z.string()).default([]),
    since: z.string().optional(), // "2026-03" or "2026-1학기" when only the semester is known
    github: z.string().optional(),
  }),
});

export const collections = { projects, notes, pages, members };
