export default function SearchLoading() {
  return (
    <div className="container-custom py-10">
      <div className="loading-shimmer h-14 max-w-2xl mx-auto mb-10" />
      <div className="loading-shimmer h-8 w-48 mb-5" />
      <div className="movie-grid">
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="loading-shimmer h-[320px] rounded-xl" />
        ))}
      </div>
    </div>
  );
}