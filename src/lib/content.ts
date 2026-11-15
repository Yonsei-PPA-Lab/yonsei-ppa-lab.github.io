import { getCollection } from 'astro:content';

/** Projects: active first, then by `order`, then newest start first. */
export async function getProjects() {
  const rank = { active: 0, paused: 1, done: 2 } as const;
  return (await getCollection('projects')).sort(
    (a, b) =>
      rank[a.data.status] - rank[b.data.status] ||
      a.data.order - b.data.order ||
      (b.data.start ?? '').localeCompare(a.data.start ?? ''),
  );
}

/** Notes, newest first. Notes with the same date keep their reading order (`order`, smaller first). */
export async function getNotes() {
  return (await getCollection('notes')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf() || a.data.order - b.data.order,
  );
}
