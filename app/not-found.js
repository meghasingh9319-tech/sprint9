'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="container-custom min-h-[60vh] flex flex-col items-center justify-center py-10 text-center">
      <div className="bg-red-500/10 p-10 rounded-xl max-w-md border border-red-500/30">
        <h2 className="text-2xl md:text-3xl mb-4 text-red-400 font-bold">
          Something Went Wrong
        </h2>
        <p className="text-text-secondary mb-6">
          {error.message || 'An unexpected error occurred. Please try again.'}
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className="btn-primary">
            Try Again
          </button>
          <Link href="/" className="btn-secondary">
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}