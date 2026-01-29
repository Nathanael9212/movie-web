import { Movie, TVShow } from "@/types/tmdb";
import MediaCard from "./MediaCard";

interface MediaRowProps {
  title: string;
  media: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
}

export default function MediaRow({ title, media, mediaType }: MediaRowProps) {
  if (!media || media.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Section Title dengan text color untuk light/dark mode */}
        <h2 className="text-2xl md:text-3xl font-bold text-white dark:text-white light:text-gray-900 mb-6 hover:text-brand-primary transition cursor-default">
          {title}
        </h2>
        
        {/* Scrollable Cards */}
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide">
          {media.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-[160px] sm:w-[180px] md:w-[200px] lg:w-[220px]"
            >
              <MediaCard media={item} mediaType={mediaType} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
