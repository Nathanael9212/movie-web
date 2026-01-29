import Image from "next/image";
import Link from "next/link";
import { TMDB_IMAGE } from "@/lib/tmdb-config";
import { Movie, TVShow } from "@/types/tmdb";

interface MediaCardProps {
  media: Movie | TVShow;
  mediaType: "movie" | "tv";
}

export default function MediaCard({ media, mediaType }: MediaCardProps) {
  const title = "title" in media ? media.title : media.name;
  const rating = media.vote_average;
  const posterUrl = TMDB_IMAGE.poster(media.poster_path, "w342");

  return (
    <Link href={`/${mediaType}/${media.id}`} className="group block">
      <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-brand-dark shadow-lg card-hover border border-white/10">
        {/* Poster Image atau Placeholder */}
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            loading="lazy"
            className="object-cover"
            sizes="220px"
          />
        ) : (
          // Simple placeholder dengan CSS aja
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-center">
              <svg className="w-16 h-16 mx-auto mb-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-500 text-sm font-medium">No Image</p>
            </div>
          </div>
        )}
        
        {/* Rating Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-sm px-2.5 py-1.5 rounded-lg z-10">
          <svg className="w-4 h-4 text-brand-accent fill-current" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
          </svg>
          <span className="text-white font-bold text-sm">{rating.toFixed(1)}</span>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        
        {/* Title on Hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <h3 className="text-white font-bold text-base line-clamp-2 mb-2">
            {title}
          </h3>
        </div>

        {/* Play Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100 z-10">
          <div className="w-16 h-16 rounded-full bg-brand-primary/90 backdrop-blur-sm flex items-center justify-center shadow-2xl">
            <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
