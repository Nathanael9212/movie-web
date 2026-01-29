import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE } from "@/lib/tmdb-config";
import { Movie } from "@/types/tmdb";

interface HeroSectionProps {
  movie: Movie;
}

export default function HeroSection({ movie }: HeroSectionProps) {
  const year = new Date(movie.release_date).getFullYear();
  const backdropUrl = TMDB_IMAGE.backdrop(movie.backdrop_path, "original");
  
  return (
    <div className="relative h-[85vh] w-full overflow-hidden">
      {/* Background Image with Fallback */}
      {backdropUrl ? (
        <div className="absolute inset-0">
          <Image
            src={backdropUrl}
            alt={movie.title}
            fill
            className="object-cover"
            priority
            quality={85}
          />
        </div>
      ) : (
        // Fallback gradient kalau gak ada backdrop
        <div className="absolute inset-0 bg-gradient-to-br from-brand-darker via-brand-dark to-gray-900" />
      )}
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />

      {/* Content Container */}
      <div className="relative h-full flex items-end">
        <div className="container mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <div className="max-w-2xl space-y-5">
            {/* Trending Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full animate-pulse">
              <span className="w-2 h-2 bg-brand-accent rounded-full"></span>
              <span className="text-sm font-bold text-brand-accent uppercase tracking-wider">
                Trending Now
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight drop-shadow-2xl">
              {movie.title}
            </h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-white/90">
              {/* Rating */}
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <svg className="w-5 h-5 text-brand-accent fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
                <span className="font-bold text-lg">{movie.vote_average.toFixed(1)}</span>
                <span className="text-white/60 text-sm">/10</span>
              </div>

              <span className="text-lg font-semibold">{year}</span>
              
              <div className="px-3 py-1 bg-brand-secondary/20 border border-brand-secondary/50 rounded text-sm font-semibold text-brand-secondary">
                HD
              </div>
            </div>

            {/* Overview */}
            <p className="text-base md:text-lg text-gray-200 leading-relaxed line-clamp-3 max-w-xl">
              {movie.overview}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href={`/movie/${movie.id}`}>
                <button className="group relative px-8 py-3.5 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-xl font-bold text-white overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-brand-primary/50">
                  <span className="relative z-10 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                    </svg>
                    Watch Now
                  </span>
                </button>
              </Link>
              
              <Link href={`/movie/${movie.id}`}>
                <button className="px-8 py-3.5 glass border border-white/20 rounded-xl font-bold text-white hover:bg-white/20 transition-all hover:scale-105">
                  More Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
