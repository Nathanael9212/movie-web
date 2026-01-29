const BASE_URL = process.env.TMDB_BASE_URL!;
const TOKEN = process.env.TMDB_TOKEN!;

export async function tmdbFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json;charset=utf-8",
    },
    next: { revalidate: 7200 }, // Cache 2 jam (dari 1 jam)
  });

  if (!res.ok) throw new Error(`TMDB API Error: ${res.status}`);
  return res.json();
}
