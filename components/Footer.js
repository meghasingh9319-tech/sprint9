import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card-bg border-t border-border-color mt-auto">
      <div className="container-custom py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-extrabold">
              <span className="text-primary">Cine</span>
              <span>Stream</span>
            </span>
            <span className="text-text-secondary text-sm">© {currentYear}</span>
          </div>
          
          <div className="flex gap-6 text-sm text-text-secondary">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/search" className="hover:text-white transition-colors">
              Search
            </Link>
            <a 
              href="https://www.themoviedb.org" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TMDB
            </a>
          </div>
        </div>
        
        <div className="mt-4 text-center text-xs text-text-secondary/60">
          Data provided by The Movie Database (TMDB)
        </div>
      </div>
    </footer>
  );
}