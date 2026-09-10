import Link from 'next/link';

export default function MovieNotFound() {
  return (
    <div className="container-custom min-h-[60vh] flex flex-col items-center justify-center py-10 text-center">
      <div className="bg-white/5 p-10 rounded-xl max-w-md">
        <h2 className="text-2xl md:text-3xl mb-4 font-bold">
          Movie Not Found
        </h2>
        <p className="text-text-secondary mb-6">
          The movie you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/" className="btn-primary inline-block">
          Browse Movies
        </Link>
      </div>
    </div>
  );
}