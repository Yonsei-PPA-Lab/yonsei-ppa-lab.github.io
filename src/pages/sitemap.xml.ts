import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Lists every public page so search engines can find them.
export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://yonsei-ppa-lab.github.io');
  const projects = await getCollection('projects');
  const notes = await getCollection('notes');
  const paths = [
    '/',
    '/about/',
    '/projects/',
    '/notes/',
    ...projects.map((p) => `/projects/${p.id}/`),
    ...notes.map((n) => `/notes/${n.id}/`),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    paths.map((p) => `  <url><loc>${new URL(p, base).href}</loc></url>`).join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
