'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <>
      <nav className="sticky top-0 z-[1000] bg-background/92 backdrop-blur-sm border-b border-white/10 px-4">
        <div className="container-custom flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-2xl tracking-tight">
            <span className="text-primary">Cine</span>
            <span>Stream</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="flex items-center gap-8">
            <div className="hidden md:flex gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive(link.href) 
                      ? 'text-white bg-white/10' 
                      : 'text-text-secondary hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}