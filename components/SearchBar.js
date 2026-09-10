'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({ initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Sync with URL param changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
          className="w-full px-5 py-3 pr-14 bg-card-bg border-2 border-border-color rounded-xl text-white placeholder-text-secondary focus:outline-none focus:border-primary transition-colors"
          aria-label="Search movies"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          aria-label="Submit search"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </form>
  );
}