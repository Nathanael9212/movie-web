import { tmdbFetch } from "@/lib/tmdb";
import { TrendingResponse } from "@/types/tmdb";
import { MOVIE_GENRES } from "@/constants/genres";
import MediaCard from "@/components/media/MediaCard";

export default async function GenrePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const movies = await tmdbFetch<TrendingResponse>(
    `/discover/movie?with_genres=${id}&sort_by=popularity.desc`
  );

  const genre = MOVIE_GENRES.find((g) => g.id === parseInt(id));

  return (
    <div className="min-h-screen pt-24 px-4 md:px-12">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          {genre?.name || "Genre"} Movies
        </h1>

        {movies.results.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {movies.results.map((movie) => (
              <MediaCard key={movie.id} media={movie} mediaType="movie" />
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center text-lg">No movies found in this genre</p>
        )}
      </div>
    </div>
  );
}
