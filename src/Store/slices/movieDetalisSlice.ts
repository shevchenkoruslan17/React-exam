import {createAsyncThunk, createSlice,} from "@reduxjs/toolkit";
import {getMovieById,} from "../../services/movie.service";
import type { IMovieDetails } from "../../models/IMovieDetalis";

interface MovieDetailsState {
    movie: IMovieDetails | null;
    loading: boolean;
    error: string | null;
}
const initialState: MovieDetailsState = {
    movie: null,
    loading: false,
    error: null,
};
export const fetchMovieDetails = createAsyncThunk<
    IMovieDetails,
    number,
    {
        rejectValue: string;
    }
>("movieDetails/fetchMovieDetails", async (id, { rejectWithValue }) => {
        try {
            return await getMovieById(id);
        } catch (error) {
            console.error(error);
            return rejectWithValue("Failed to load movie details.");
        }
    }
);
const movieDetailsSlice = createSlice({name: "movieDetails", initialState,
    reducers: {clearMovieDetails: (state) => {
            state.movie = null;
            state.error = null;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
    builder.addCase(fetchMovieDetails.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                    state.movie = null;
                }
            )
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                    state.loading = false;
                    state.movie = action.payload;
                }
            )
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                    state.loading = false;
                    state.error =
                        action.payload ?? "Failed to load movie details.";
                }
            );
    },
});
export const {clearMovieDetails,} = movieDetailsSlice.actions;
export default movieDetailsSlice.reducer;