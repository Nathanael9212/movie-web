// Base Types
export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Network {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface Creator {
  id: number;
  name: string;
  profile_path: string | null;
}

// Movie & TV Show Base
export interface Movie {
  id: number;
  title: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  genre_ids?: number[];
  media_type?: "movie";
}

export interface TVShow {
  id: number;
  name: string;
  title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  genre_ids?: number[];
  media_type?: "tv";
}

// Trending Item (untuk /trending endpoint)
export interface TrendingItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
  media_type?: "movie" | "tv";
}

// Media Item (untuk browse/popular/top_rated endpoints)
export interface MediaItem {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  genre_ids?: number[];
}

// Detailed Types
export interface MovieDetail {
  id: number;
  title: string;
  name?: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  budget: number;
  revenue: number;
  status: string;
  videos?: {
    results: Video[];
  };
  media_type?: "movie";
}

export interface TVDetail {
  id: number;
  name: string;
  title?: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  first_air_date: string;
  last_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: Genre[];
  networks: Network[];
  production_companies: ProductionCompany[];
  created_by: Creator[];
  status: string;
  type: string;
  videos?: {
    results: Video[];
  };
  media_type?: "tv";
}

// Cast & Crew
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

// API Response Types
export interface TrendingResponse {
  page: number;
  results: TrendingItem[];
  total_pages: number;
  total_results: number;
}

export interface MediaResponse {
  page: number;
  results: MediaItem[];
  total_pages: number;
  total_results: number;
}

export interface SearchResponse {
  page: number;
  results: (Movie | TVShow)[];
  total_pages: number;
  total_results: number;
}
