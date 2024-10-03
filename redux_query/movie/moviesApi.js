import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Step 1: Define the API service
export const moviesApi = createApi({
  reducerPath: 'moviesApi', // A unique key for the API slice
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }), // Base URL for API requests
  endpoints: (builder) => ({
    getMovies: builder.query({
      query: (page = 1) => `movies?page=${page}`, // Query to fetch all movies
    }),
    getMoviesByCaterogy: builder.query({
      query: ({ type, page = 1 }) => `movies/caterogy/${type}?page=${page}`, // Query to fetch movies by category
    }),
    getMoviesBySearch: builder.query({
      query: ({ query, page = 1 }) => `search?q=${query}&page=${page}`, // Query to search movies
    }),
    getMovieDetail: builder.query({
      query: (id = 1) => `movies/${id}`, // Query to fetch movie details by ID
    }),
  }),
});

// Step 2: Export the auto-generated hooks for use in components
export const {
  useGetMoviesQuery,
  useGetMoviesByCaterogyQuery,
  useGetMoviesBySearchQuery,
  useGetMovieDetailQuery,
} = moviesApi;
