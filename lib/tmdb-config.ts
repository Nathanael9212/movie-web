export const TMDB_IMAGE = {
  // Return string | null (untuk conditional rendering)
  poster: (path: string | null, size = "w500"): string | null =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  
  backdrop: (path: string | null, size = "w1280"): string | null =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : null,
  
  profile: (path: string | null): string | null =>
    path ? `https://image.tmdb.org/t/p/w185${path}` : null,
  
  logo: (path: string | null): string | null =>
    path ? `https://image.tmdb.org/t/p/w500${path}` : null,
};

// Helper untuk default fallback (always return string)
export const TMDB_IMAGE_WITH_FALLBACK = {
  poster: (path: string | null, size = "w500"): string =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.png",
};
