export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
  }
  
  export interface TVShow {
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    first_air_date: string;
    vote_average: number;
    vote_count: number;
  }
  
  export interface TrendingResponse {
    page: number;
    results: (Movie | TVShow)[];
    total_pages: number;
    total_results: number;
  }
  
  export interface MovieDetail extends Movie {
    genres: Genre[];
    runtime: number;
    status: string;
    tagline: string;
    budget: number;
    revenue: number;
  }
  
  export interface TVDetail extends TVShow {
    genres: Genre[];
    number_of_seasons: number;
    number_of_episodes: number;
    status: string;
    tagline: string;
    episode_run_time: number[];
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Cast {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
    order: number;
  }
  
  export interface Credits {
    cast: Cast[];
    crew: any[];
  }
  
  export interface SearchResponse {
    page: number;
    results: any[];
    total_pages: number;
    total_results: number;
  }
  