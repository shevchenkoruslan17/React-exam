import {createAsyncThunk, createSlice, type PayloadAction,} from "@reduxjs/toolkit";
import {getMovies, searchMovies, getMoviesByGenre, type IMoviesResponse,} from "../../services/movie.service";
import { getGenres } from "../../services/genre.service";
import type { IMovie } from "../../models/IMovie";
import type { IGenre } from "../../models/IGenre";

interface MoviesState {
    movies: IMovie[];
    genres: IGenre[];
    page: number;
    totalPages: number;
    totalResults: number;
    searchQuery: string;
    selectedGenre: number;
    sortBy: string;
    loading: boolean;
    error: string | null;
}
const initialState: MoviesState = {
    movies: [],
    genres: [],
    page: 1,
    totalPages: 1,
    totalResults: 0,
    searchQuery: "",
    selectedGenre: 0,
    sortBy: "popularity.desc",
    loading: false,
    error: null,
};
export const fetchMovies = createAsyncThunk<IMoviesResponse,
    { page?: number; sortBy?: string;},
    { rejectValue: string;}>("movies/fetchMovies",
    async ({page = 1, sortBy = "popularity.desc",}, { rejectWithValue }) => {
        try {return await getMovies(page, sortBy);} catch (error) {
            console.error(error);
            return rejectWithValue("Failed to load movies.");
        }
    }
);
export const fetchGenres = createAsyncThunk<IGenre[], void,{rejectValue: string;}>("movies/fetchGenres",
    async (_, { rejectWithValue }) => {
        try {const data = await getGenres();
            return data.genres;
        } catch (error) {
            console.error(error);
            return rejectWithValue("Failed to load genres.");
        }
    }
);
export const searchMoviesThunk = createAsyncThunk<IMoviesResponse, {query: string; page?: number;},{rejectValue: string;}>("movies/searchMovies",
    async ({query, page = 1,}, { rejectWithValue }) => {
        try {
            return await searchMovies(query, page);
        } catch (error) {
            console.error(error);
            return rejectWithValue("Failed to search movies.");
        }
    }
);
export const fetchMoviesByGenre = createAsyncThunk<IMoviesResponse,{ genreId: number; page?: number; sortBy?: string; },{rejectValue: string;}>("movies/fetchMoviesByGenre",
    async ({genreId, page = 1, sortBy = "popularity.desc",}, { rejectWithValue }) => {
        try {
            return await getMoviesByGenre(genreId, page, sortBy);
        } catch (error) {
            console.error(error);
            return rejectWithValue("Failed to load movies by genre.");
        }
    }
);
const moviesSlice = createSlice({
    name: "movies", initialState,
    reducers:{
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSelectedGenre: (state, action: PayloadAction<number>) => {
            state.selectedGenre = action.payload;
        },
        setSortBy: (state, action: PayloadAction<string>) => {
            state.sortBy = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetMoviesState: () => initialState,
    },
    extraReducers: (builder) => {builder
            .addCase(fetchMovies.pending, (state) => {state.loading = true;state.error = null;})
            .addCase(fetchMovies.fulfilled, (state, action) => {
                    state.loading = false;
                    state.movies = action.payload.results;
                    state.page = action.payload.page;
                    state.totalPages = action.payload.total_pages;
                    state.totalResults = action.payload.total_results;
                }
            )
            .addCase(fetchMovies.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload ?? "Failed to load movies.";
                }
            )
            .addCase(fetchGenres.fulfilled, (state, action) => {
                    state.genres = action.payload;
                }
            )
            .addCase(fetchGenres.rejected, (state, action) => {
                    state.error = action.payload ?? "Failed to load genres.";
                }
            )
            .addCase(searchMoviesThunk.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(searchMoviesThunk.fulfilled, (state, action) => {
                    state.loading = false;
                    state.movies = action.payload.results;
                    state.page = action.payload.page;
                    state.totalPages = action.payload.total_pages;
                    state.totalResults = action.payload.total_results;
                }
            )
            .addCase(searchMoviesThunk.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload ?? "Failed to search movies.";
                }
            )
            .addCase(fetchMoviesByGenre.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addCase(fetchMoviesByGenre.fulfilled,(state, action) => {
                    state.loading = false;
                    state.movies = action.payload.results;
                    state.page = action.payload.page;
                    state.totalPages = action.payload.total_pages;
                    state.totalResults = action.payload.total_results;
                }
            )
            .addCase(fetchMoviesByGenre.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload ?? "Failed to load movies by genre.";
                }
            );
    },
});
export const {setSearchQuery, setSelectedGenre, setSortBy,clearError,resetMoviesState,} = moviesSlice.actions;
export default moviesSlice.reducer;