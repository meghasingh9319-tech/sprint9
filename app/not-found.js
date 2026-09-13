import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-custom min-h-[60vh] flex flex-col items-center justify-center py-10 text-center">
      <div className="bg-surface p-10 rounded-xl max-w-md border border-border">
        <h1 className="text-6xl font-bold text-accent mb-4">404</h1>

        <h2 className="text-2xl md:text-3xl mb-4 text-white font-bold">
          Movie Not Found
        </h2>

        <p className="text-text-secondary mb-6">
          Sorry, the page or movie you are looking for could not be found.
        </p>

        <Link href="/" className="btn-primary inline-block">
          Go Home
        </Link>
      </div>
    </div>
  );
}