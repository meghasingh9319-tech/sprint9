export default function MovieLoading() {
  return (
    <div>
      <div className="loading-shimmer h-[60vh] w-full" />
      <div className="container-custom py-10">
        <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10">
          <div className="loading-shimmer h-[450px]" />
          <div>
            <div className="loading-shimmer h-8 w-3/4 mb-5" />
            <div className="loading-shimmer h-5 w-1/2 mb-3" />
            <div className="loading-shimmer h-24 w-full mb-5" />
            <div className="loading-shimmer h-10 w-3/5 mb-3" />
            <div className="loading-shimmer h-10 w-2/5" />
          </div>
        </div>
      </div>
    </div>
  );
}