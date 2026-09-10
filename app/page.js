import { getPopularMovies } from '@/lib/tmdb';
import Hero from '@/components/Hero';
import MovieGrid from '@/components/MovieGrid';
import Link from 'next/link';

export const metadata = {
  title: 'Home',
  description: 'Discover the most popular movies currently trending.',
};

export default async function HomePage() {
  let movies = [];
  let heroMovie = null;
  let error = null;

  try {
    const response = await getPopularMovies();
    movies = response.results || [];
    
    if (movies.length > 0) {
      const topMovies = movies.slice(0, 5);
      heroMovie = topMovies[Math.floor(Math.random() * topMovies.length)];
    }
  } catch (err) {
    error = err.message || 'Failed to load movies';
    console.error('HomePage error:', err);
  }

  return (
    <div>
      {heroMovie && <Hero movie={heroMovie} />}
      
      <section className="container-custom py-10 md:py-15">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-2xl md:text-3xl font-bold">
            Popular Movies
          </h2>
          <Link href="/search" className="btn-secondary text-sm px-4 py-2">
            View All
          </Link>
        </div>
        
        {error ? (
          <div className="p-10 bg-red-500/10 rounded-xl border border-red-500/30 text-center">
            <p className="text-red-400 mb-3">⚠️ {error}</p>
            <p className="text-text-secondary text-sm">
              Please try refreshing the page or check your API key.
            </p>
          </div>
        ) : movies.length > 0 ? (
          <MovieGrid movies={movies} />
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-text-secondary">
              No movies available at the moment.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}