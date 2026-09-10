import { searchMovies } from '@/lib/tmdb';
import MovieGrid from '@/components/MovieGrid';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';

export const metadata = {
  title: 'Search',
  description: 'Search for movies by title.',
};

export default async function SearchPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || '';
  
  let movies = [];
  let error = null;
  let searchPerformed = false;

  if (query) {
    searchPerformed = true;
    try {
      const response = await searchMovies(query);
      movies = response.results || [];
    } catch (err) {
      error = err.message || 'Search failed. Please try again.';
      console.error('Search error:', err);
    }
  }

  return (
    <div className="container-custom py-10">
      <div className="max-w-2xl mx-auto mb-10">
        <SearchBar initialQuery={query} />
      </div>

      {searchPerformed && (
        <>
          <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
            <h2 className="text-xl md:text-2xl font-bold">
              {error ? 'Search Error' : `Results for "${query}"`}
              {!error && movies.length > 0 && (
                <span className="text-sm font-normal text-text-secondary ml-3">
                  ({movies.length} {movies.length === 1 ? 'movie' : 'movies'})
                </span>
              )}
            </h2>
            <Link href="/" className="btn-secondary text-sm px-4 py-2">
              ← Back to Home
            </Link>
          </div>

          {error ? (
            <div className="p-10 bg-red-500/10 rounded-xl border border-red-500/30 text-center">
              <p className="text-red-400 mb-3">⚠️ {error}</p>
              <p className="text-text-secondary text-sm">
                Please try a different search term.
              </p>
            </div>
          ) : movies.length > 0 ? (
            <MovieGrid movies={movies} />
          ) : (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🎬</div>
              <h3 className="text-xl mb-2 font-semibold">
                No Movies Found
              </h3>
              <p className="text-text-secondary">
                We couldn't find any movies matching "{query}".
              </p>
              <p className="text-text-secondary text-sm mt-2">
                Try adjusting your search terms.
              </p>
            </div>
          )}
        </>
      )}

      {!searchPerformed && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-xl mb-2 font-semibold">
            Search for Movies
          </h3>
          <p className="text-text-secondary">
            Enter a movie title to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
}