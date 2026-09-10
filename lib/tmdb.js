const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  console.warn('⚠️ TMDB_API_KEY is not set in environment variables');
}

async function fetchFromTMDB(endpoint, params = {}) {
  if (!API_KEY) {
    throw new Error('TMDB_API_KEY is not configured');
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'en-US');
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.append(key, value);
    }
  });

  const response = await fetch(url.toString(), {
    headers: {
      'Accept': 'application/json',
    },
    next: {
      revalidate: 3600, // Revalidate every hour
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `TMDB API Error: ${response.status} ${response.statusText} - ${errorData.status_message || 'Unknown error'}`
    );
  }

  return response.json();
}

export async function getPopularMovies(page = 1) {
  try {
    return await fetchFromTMDB('/movie/popular', { page });
  } catch (error) {
    console.error('Failed to fetch popular movies:', error);
    throw error;
  }
}

export async function searchMovies(query, page = 1) {
  if (!query || query.trim() === '') {
    return { results: [], total_results: 0 };
  }

  try {
    return await fetchFromTMDB('/search/movie', { 
      query: query.trim(),
      page,
    });
  } catch (error) {
    console.error('Failed to search movies:', error);
    throw error;
  }
}

export async function getMovieDetails(id) {
  try {
    return await fetchFromTMDB(`/movie/${id}`);
  } catch (error) {
    console.error(`Failed to fetch movie details for ID ${id}:`, error);
    throw error;
  }
}

export async function getMovieCredits(id) {
  try {
    return await fetchFromTMDB(`/movie/${id}/credits`);
  } catch (error) {
    console.error(`Failed to fetch movie credits for ID ${id}:`, error);
    return { cast: [], crew: [] };
  }
}

export default {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  getMovieCredits,
};