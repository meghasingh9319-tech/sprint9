'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function MobileMenu({ isOpen, onClose }) {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/search', label: 'Search' },
  ];

  // Close menu on route change
  useEffect(() => {
    onClose();
  }, [pathname, onClose]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-background/95 backdrop-blur-sm md:hidden">
      <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`text-2xl font-medium transition-colors ${
              pathname === link.href 
                ? 'text-primary' 
                : 'text-white hover:text-primary'
            }`}
          >
            {link.label}
          </Link>
        ))}
        <button
          onClick={onClose}
          className="mt-8 text-text-secondary hover:text-white transition-colors"
        >
          Close Menu
        </button>
      </div>
    </div>
  );
}