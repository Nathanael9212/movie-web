import { tmdbFetch } from "@/lib/tmdb";
import { TrendingResponse, MovieDetails } from "@/types/tmdb";
import MediaCard from "@/components/media/MediaCard";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const [trending, trendingMovies, trendingTV] = await Promise.all([
    tmdbFetch<TrendingResponse>("/trending/all/week"),
    tmdbFetch<TrendingResponse>("/trending/movie/week"),
    tmdbFetch<TrendingResponse>("/trending/tv/week"),
  ]);

  const featured = trending.results[0];
  const featuredDetails = featured
    ? await tmdbFetch<MovieDetails>(
        `/${featured.media_type}/${featured.id}?append_to_response=videos`
      )
    : null;

  const backdropUrl = featured?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featured.backdrop_path}`
    : null;

  const trailer = featuredDetails?.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section - DARK */}
      <section className="relative h-[85vh] md:h-[90vh] w-full overflow-hidden bg-gray-900">
        {/* Backdrop Image */}
        {backdropUrl && (
          <>
            <Image
              src={backdropUrl}
              alt={featured.title || featured.name || "Featured"}
              fill
              className="object-cover"
              priority
            />
            {/* Dark Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-6 md:px-12">
            <div className="max-w-2xl space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold text-sm shadow-lg">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                TRENDING NOW
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-7xl font-black text-white leading-tight drop-shadow-2xl">
                {featured?.title || featured?.name}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-white font-semibold">
                <div className="flex items-center gap-2 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full shadow-lg">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <span className="font-bold">{featured?.vote_average.toFixed(1)}</span>
                </div>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full shadow-lg">
                  2025
                </span>
                <span className="px-3 py-1 bg-cyan-500 text-white rounded-full shadow-lg uppercase text-xs font-bold">
                  HD
                </span>
              </div>

              {/* Overview */}
              <p className="text-gray-200 text-lg leading-relaxed line-clamp-3 drop-shadow-lg">
                {featured?.overview}
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap gap-4">
                {trailer && (
                  <a
                    href={`https://www.youtube.com/watch?v=${trailer.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"/>
                    </svg>
                    Watch Now
                  </a>
                )}
                <Link
                  href={`/${featured?.media_type}/${featured?.id}`}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full shadow-xl hover:bg-white/30 hover:shadow-2xl hover:scale-105 transition-all border border-white/30"
                >
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Sections - WHITE BACKGROUND */}
      <div className="bg-white">
        <div className="container mx-auto px-6 md:px-12 py-16 space-y-16">
          {/* Trending This Week */}
          <section>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
              Trending This Week
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trending.results.slice(1, 13).map((item) => (
                <MediaCard
                  key={item.id}
                  media={item}
                  mediaType={item.media_type as "movie" | "tv"}
                />
              ))}
            </div>
          </section>

          {/* Trending Movies */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Trending Movies
              </h2>
              <Link
                href="/browse/movies"
                className="text-brand-primary hover:text-brand-secondary font-bold flex items-center gap-2 transition-colors"
              >
                View All
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trendingMovies.results.slice(0, 12).map((movie) => (
                <MediaCard key={movie.id} media={movie} mediaType="movie" />
              ))}
            </div>
          </section>

          {/* Trending TV Shows */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900">
                Trending TV Shows
              </h2>
              <Link
                href="/browse/tv"
                className="text-brand-primary hover:text-brand-secondary font-bold flex items-center gap-2 transition-colors"
              >
                View All
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {trendingTV.results.slice(0, 12).map((show) => (
                <MediaCard key={show.id} media={show} mediaType="tv" />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
