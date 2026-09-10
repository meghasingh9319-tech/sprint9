import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'Cine-Stream - Movie Discovery Platform',
    template: '%s | Cine-Stream',
  },
  description: 'Discover, explore, and find your next favorite movie. Cine-Stream brings you the best in cinema with our comprehensive movie database.',
  keywords: 'movies, streaming, cinema, film, entertainment, movie discovery',
  authors: [{ name: 'Cine-Stream' }],
  openGraph: {
    title: 'Cine-Stream - Movie Discovery Platform',
    description: 'Discover, explore, and find your next favorite movie.',
    url: 'https://cinestream.vercel.app',
    siteName: 'Cine-Stream',
    images: [
      {
        url: 'https://image.tmdb.org/t/p/original/8cdWjvZQUkUEXz2ImuJj3S1Waxl.jpg',
        width: 1200,
        height: 630,
        alt: 'Cine-Stream Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cine-Stream - Movie Discovery Platform',
    description: 'Discover, explore, and find your next favorite movie.',
    images: ['https://image.tmdb.org/t/p/original/8cdWjvZQUkUEXz2ImuJj3S1Waxl.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-white">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}