import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/movieSlice";
import movieDetailsReducer from "./slices/movieDetalisSlice";

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        movieDetails: movieDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;