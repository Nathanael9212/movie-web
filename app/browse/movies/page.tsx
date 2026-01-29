import { tmdbFetch } from "@/lib/tmdb";
import { TrendingResponse } from "@/types/tmdb";
import MediaCard from "@/components/media/MediaCard";
import Link from "next/link";
import { MOVIE_GENRES } from "@/constants/genres";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<{ rating?: string; genre?: string }>;
}) {
  const params = await searchParams;
  const selectedRating = params.rating || "all";
  const selectedGenre = params.genre || "all";

  // Build API query dengan rating + genre filter
  let popularQuery = "/movie/popular?page=1";
  let topRatedQuery = "/movie/top_rated?page=1";

  // Filter kombinasi
  if (selectedRating !== "all" || selectedGenre !== "all") {
    const minRating = selectedRating !== "all" ? parseFloat(selectedRating) : 0;
    const genreParam = selectedGenre !== "all" ? `&with_genres=${selectedGenre}` : "";
    
    popularQuery = `/discover/movie?sort_by=popularity.desc${
      selectedRating !== "all" ? `&vote_average.gte=${minRating}&vote_count.gte=100` : ""
    }${genreParam}&page=1`;
    
    topRatedQuery = `/discover/movie?sort_by=vote_average.desc${
      selectedRating !== "all" ? `&vote_average.gte=${minRating}&vote_count.gte=100` : ""
    }${genreParam}&page=1`;
  }

  const [popular, topRated] = await Promise.all([
    tmdbFetch<TrendingResponse>(popularQuery),
    tmdbFetch<TrendingResponse>(topRatedQuery),
  ]);

  return (
    <div className="min-h-screen pt-28 pb-20 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Movies
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Explore thousands of movies
          </p>

          {/* Genre Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-3">Filter by Genre</h3>
            <div className="flex gap-2 flex-wrap">
              <Link
                href="/browse/movies"
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  selectedGenre === "all"
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                All Genres
              </Link>
              {MOVIE_GENRES.map((genre) => (
                <Link
                  key={genre.id}
                  href={`/browse/movies?genre=${genre.id}${selectedRating !== "all" ? `&rating=${selectedRating}` : ""}`}
                  className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    selectedGenre === String(genre.id)
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                  }`}
                >
                  {genre.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">Filter by Rating</h3>
            <div className="flex gap-3 flex-wrap">
              <Link
                href={`/browse/movies${selectedGenre !== "all" ? `?genre=${selectedGenre}` : ""}`}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all ${
                  selectedRating === "all"
                    ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-white shadow-lg shadow-brand-primary/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                All Ratings
              </Link>

              <Link
                href={`/browse/movies?rating=8${selectedGenre !== "all" ? `&genre=${selectedGenre}` : ""}`}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedRating === "8"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <span>8.0+</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-xs">Excellent</span>
              </Link>

              <Link
                href={`/browse/movies?rating=7${selectedGenre !== "all" ? `&genre=${selectedGenre}` : ""}`}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedRating === "7"
                    ? "bg-gradient-to-r from-yellow-500 to-amber-500 text-white shadow-lg shadow-yellow-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <span>7.0+</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-xs">Great</span>
              </Link>

              <Link
                href={`/browse/movies?rating=6${selectedGenre !== "all" ? `&genre=${selectedGenre}` : ""}`}
                className={`px-5 py-2.5 rounded-full font-semibold transition-all flex items-center gap-2 ${
                  selectedRating === "6"
                    ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200"
                }`}
              >
                <span>6.0+</span>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="text-xs">Good</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Popular Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Popular Now
          </h2>
          {popular.results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {popular.results.map((movie) => (
                <MediaCard key={movie.id} media={movie} mediaType="movie" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 text-lg">
                No movies found with selected filters
              </p>
            </div>
          )}
        </section>

        {/* Top Rated Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">
            Top Rated
          </h2>
          {topRated.results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {topRated.results.map((movie) => (
                <MediaCard key={movie.id} media={movie} mediaType="movie" />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-2xl">
              <p className="text-gray-600 text-lg">
                No movies found with selected filters
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
