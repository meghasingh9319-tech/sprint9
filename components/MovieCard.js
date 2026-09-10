import Image from 'next/image';
import Link from 'next/link';

export default function MovieCard({ movie }) {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const releaseDate = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <Link href={`/movie/${movie.id}`} className="group block">
      <div className="bg-card-bg rounded-xl overflow-hidden transition-all duration-300 hover:bg-card-hover hover:shadow-[0_8px_32px_rgba(0,0,0,0.5)] hover:-translate-y-1">
        <div className="relative aspect-[2/3] overflow-hidden">
          {posterUrl ? (
            <Image
              src={posterUrl}
              alt={`${movie.title} poster`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            />
          ) : (
            <div className="w-full h-full bg-card-hover flex items-center justify-center text-text-secondary">
              <span className="text-sm">No Poster</span>
            </div>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
            {movie.title}
          </h3>
          <div className="flex justify-between items-center mt-1 text-xs text-text-secondary">
            <span>⭐ {rating}</span>
            <span>{releaseDate}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}