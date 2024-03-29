// movieSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async () => {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=a92727b2b809edeb2a0d5b0566cc5732`);
    const data = await response.json();
    return data.results;
  }
);

const movieSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default movieSlice.reducer;
