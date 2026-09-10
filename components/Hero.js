import Image from 'next/image';
import Link from 'next/link';

export default function Hero({ movie }) {
  if (!movie) return null;

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const releaseDate = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';

  return (
    <div className="relative h-[70vh] min-h-[450px] max-h-[700px] overflow-hidden">
      {backdropUrl && (
        <Image
          src={backdropUrl}
          alt={movie.title}
          fill
          priority
          className="object-cover object-center"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/40 to-background/80" />
      
      <div className="container-custom relative h-full flex items-center z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black mb-3 leading-tight drop-shadow-lg">
            {movie.title}
          </h1>
          {movie.tagline && (
            <p className="text-lg sm:text-xl text-text-secondary italic mb-4">
              {movie.tagline}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-secondary">
            <span className="flex items-center gap-1">⭐ {rating} / 10</span>
            <span>•</span>
            <span>{releaseDate}</span>
            {movie.genres && movie.genres.length > 0 && (
              <>
                <span>•</span>
                <span>{movie.genres.slice(0, 3).map(g => g.name).join(', ')}</span>
              </>
            )}
          </div>
          <p className="text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 md:line-clamp-4">
            {movie.overview}
          </p>
          <Link href={`/movie/${movie.id}`} className="btn-primary inline-block">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}