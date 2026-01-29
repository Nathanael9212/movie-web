import Image from "next/image";
import Link from "next/link";

interface MediaCardProps {
  media: {
    id: number;
    title?: string;
    name?: string;
    poster_path: string | null;
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
  };
  mediaType: "movie" | "tv";
}

export default function MediaCard({ media, mediaType }: MediaCardProps) {
  const title = media.title || media.name || "Untitled";
  const posterUrl = media.poster_path
    ? `https://image.tmdb.org/t/p/w500${media.poster_path}`
    : "/placeholder.png";
  
  const year = media.release_date?.split("-")[0] || media.first_air_date?.split("-")[0] || "N/A";

  return (
    <Link
      href={`/${mediaType}/${media.id}`}
      className="relative aspect-[2/3] rounded-xl overflow-hidden bg-white shadow-lg card-hover border border-gray-200 group"
    >
      <Image
        src={posterUrl}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-110"
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-bold text-sm line-clamp-2 mb-2">
            {title}
          </h3>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
              <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              {media.vote_average.toFixed(1)}
            </div>
            <span className="text-white text-xs">{year}</span>
          </div>
        </div>
      </div>

      {/* Rating Badge (Always Visible) */}
      <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
        <svg className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        <span className="text-white text-xs font-bold">{media.vote_average.toFixed(1)}</span>
      </div>
    </Link>
  );
}
