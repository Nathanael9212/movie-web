import { notFound } from "next/navigation";
import Image from "next/image";
import { tmdbFetch } from "@/lib/tmdb";
import { TMDB_IMAGE } from "@/lib/tmdb-config";

interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string | null;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  release_date: string;
  runtime: number;
  genres: { id: number; name: string }[];
  tagline: string;
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

interface CreditsResponse {
  cast: CastMember[];
}

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let movie: MovieDetails;
  let credits: CreditsResponse;
  
  try {
    [movie, credits] = await Promise.all([
      tmdbFetch<MovieDetails>(`/movie/${id}`),
      tmdbFetch<CreditsResponse>(`/movie/${id}/credits`),
    ]);
  } catch (error) {
    notFound();
  }

  const backdropUrl = TMDB_IMAGE.backdrop(movie.backdrop_path, "original");
  const year = new Date(movie.release_date).getFullYear();
  const hours = Math.floor(movie.runtime / 60);
  const minutes = movie.runtime % 60;
  
  // Top 10 cast members
  const topCast = credits.cast.slice(0, 10);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-screen w-full">
        {/* Background Image */}
        {backdropUrl ? (
          <div className="absolute inset-0">
            <Image
              src={backdropUrl}
              alt={movie.title}
              fill
              className="object-cover"
              priority
              quality={90}
            />
          </div>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-gray-900" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative h-full flex items-end">
          <div className="container mx-auto px-6 md:px-12 pb-20">
            <div className="max-w-4xl">
              {/* Tagline */}
              {movie.tagline && (
                <p className="text-gray-300 text-lg md:text-xl italic mb-6">
                  "{movie.tagline}"
                </p>
              )}

              {/* Rating Circle */}
              <div className="flex items-center gap-6 mb-8">
                <div className="relative w-24 h-24">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="8"
                      fill="none"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="42"
                      stroke="#F59E0B"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray={`${(movie.vote_average / 10) * 264} 264`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-2xl font-black text-white">
                      {movie.vote_average.toFixed(1)}
                    </span>
                    <span className="text-xs text-gray-400">{movie.vote_count} votes</span>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-brand-accent fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    <span className="font-bold text-lg">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>

                  <span className="text-white/40">•</span>
                  <span className="text-lg font-semibold">{year}</span>

                  <span className="text-white/40">•</span>
                  <span className="text-lg font-semibold">
                    {hours}h {minutes}m
                  </span>

                  <span className="text-white/40">•</span>
                  <div className="px-3 py-1 bg-brand-secondary/20 border border-brand-secondary/50 rounded text-sm font-semibold text-brand-secondary">
                    Released
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8">
                {movie.title}
              </h1>

              {/* Genres */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Genres</h2>
                <div className="flex flex-wrap gap-3">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-colors cursor-pointer"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-lg text-gray-300 leading-relaxed max-w-3xl">
                  {movie.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {topCast.length > 0 && (
        <div className="container mx-auto px-6 md:px-12 py-16">
          <h2 className="text-3xl font-bold text-white mb-8">Top Cast</h2>
          
          <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
            {topCast.map((member) => {
              const profileUrl = TMDB_IMAGE.profile(member.profile_path);
              
              return (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-32 group cursor-pointer"
                >
                  {/* Profile Image */}
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800 mb-3 ring-2 ring-white/10 group-hover:ring-brand-primary transition-all">
                    {profileUrl ? (
                      <Image
                        src={profileUrl}
                        alt={member.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="128px"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Cast Info */}
                  <div className="text-center">
                    <h3 className="font-bold text-white text-sm line-clamp-2 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {member.character}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
