import { getMovieDetails, getMovieCredits } from '@/lib/tmdb';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import MovieCast from '@/components/MovieCast';

export async function generateMetadata({ params }) {
  const { id } = await params;
  
  try {
    const movie = await getMovieDetails(id);
    
    return {
      title: movie.title,
      description: movie.overview || `${movie.title} - Movie details and information.`,
      openGraph: {
        title: movie.title,
        description: movie.overview || `${movie.title} - Movie details.`,
        images: movie.poster_path 
          ? [`https://image.tmdb.org/t/p/original${movie.poster_path}`]
          : [],
      },
    };
  } catch (error) {
    return {
      title: 'Movie Not Found',
      description: 'The requested movie could not be found.',
    };
  }
}

export default async function MovieDetailPage({ params }) {
  const { id } = await params;
  
  let movie = null;
  let credits = null;
  let error = null;

  try {
    [movie, credits] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
    ]);
  } catch (err) {
    error = err.message;
    console.error(`Movie detail error for ID ${id}:`, err);
  }

  if (error || !movie) {
    notFound();
  }

  const backdropUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const runtime = movie.runtime ? `${movie.runtime} min` : 'N/A';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';
  const releaseDate = movie.release_date ? new Date(movie.release_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }) : 'N/A';

  return (
    <div>
      {/* Hero Backdrop */}
      <div className="relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden">
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
            <Link href="/" className="inline-flex items-center gap-2 text-text-secondary mb-5 transition-colors hover:text-white">
              ← Back to Movies
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-3 drop-shadow-lg">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="text-lg md:text-xl text-text-secondary italic mb-4">
                {movie.tagline}
              </p>
            )}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-text-secondary">
              <span>⭐ {rating} / 10</span>
              <span>•</span>
              <span>{releaseDate}</span>
              <span>•</span>
              <span>{runtime}</span>
            </div>
            <p className="text-sm md:text-base leading-relaxed mb-5 line-clamp-4">
              {movie.overview}
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {movie.genres?.map((genre) => (
                <span key={genre.id} className="bg-white/10 px-3 py-1 rounded-full text-xs border border-white/10">
                  {genre.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 md:gap-10">
          {/* Poster */}
          <div className="md:sticky md:top-5">
            {posterUrl ? (
              <Image
                src={posterUrl}
                alt={`${movie.title} poster`}
                width={300}
                height={450}
                className="w-full h-auto rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
                priority
              />
            ) : (
              <div className="w-full h-[450px] bg-card-bg rounded-xl flex items-center justify-center text-text-secondary border-2 border-dashed border-border-color">
                No Poster
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <h2 className="text-2xl font-bold mb-5">Details</h2>
            
            <div className="space-y-3 mb-8">
              <div>
                <strong className="text-text-secondary block">Overview</strong>
                <p className="mt-1 leading-relaxed">
                  {movie.overview || 'No overview available.'}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <strong className="text-text-secondary">Runtime</strong>
                  <p>{runtime}</p>
                </div>
                <div>
                  <strong className="text-text-secondary">Rating</strong>
                  <p>⭐ {rating} / 10 ({movie.vote_count?.toLocaleString() || 0} votes)</p>
                </div>
                <div>
                  <strong className="text-text-secondary">Release Date</strong>
                  <p>{releaseDate}</p>
                </div>
                <div>
                  <strong className="text-text-secondary">Popularity</strong>
                  <p>{movie.popularity?.toFixed(0) || 'N/A'}</p>
                </div>
              </div>

              {movie.production_companies?.length > 0 && (
                <div>
                  <strong className="text-text-secondary">Production Companies</strong>
                  <p>
                    {movie.production_companies.map(c => c.name).join(', ')}
                  </p>
                </div>
              )}
            </div>

            {credits && <MovieCast cast={credits.cast} />}
          </div>
        </div>
      </div>
    </div>
  );
}