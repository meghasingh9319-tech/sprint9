export default function Loading() {
  return (
    <div className="container-custom py-10">
      <div className="loading-shimmer h-[400px] w-full mb-10 rounded-xl" />
      
      <div className="flex justify-between items-center mb-5">
        <div className="loading-shimmer h-8 w-48" />
        <div className="loading-shimmer h-9 w-24" />
      </div>
      
      <div className="movie-grid">
        {Array(12).fill(0).map((_, i) => (
          <div key={i} className="loading-shimmer h-[320px] rounded-xl" />
        ))}
      </div>
    </div>
  );
}