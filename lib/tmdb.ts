export async function tmdbFetch<T>(endpoint: string): Promise<T> {
  const baseUrl = process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  // Gunakan API Key ATAU Token
  const apiKey = process.env.TMDB_API_KEY;
  const token = process.env.TMDB_ACCESS_TOKEN;
  
  const url = `${baseUrl}${endpoint}${endpoint.includes("?") ? "&" : "?"}${apiKey ? `api_key=${apiKey}` : ""}`;

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Kalau ada token, pakai Bearer
  if (token && !apiKey) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    headers,
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`TMDB API Error: ${response.status}`);
  }

  return response.json();
}
