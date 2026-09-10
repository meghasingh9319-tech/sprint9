import MovieCard from './MovieCard';

export default function MovieGrid({ movies }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-lg text-text-secondary">No movies available.</p>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}