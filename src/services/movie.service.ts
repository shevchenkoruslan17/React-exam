import { api } from "./api.service";
import type { IMovie } from "../models/IMovie";
import type { IMovieDetails } from "../models/IMovieDetalis";

export interface IMoviesResponse {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
export const getMovies = async (
    page: number = 1, sortBy: string = "popularity.desc"): Promise<IMoviesResponse> => {
    const response =
        await api.get<IMoviesResponse>(
            "/discover/movie",
            {params: {page, sort_by: sortBy,},}
        );
    return response.data;
};
export const searchMovies = async (
    query: string, page: number = 1): Promise<IMoviesResponse> => {
    const response =
        await api.get<IMoviesResponse>(
            "/search/movie",
            {params: {query, page,},}
        );
    return response.data;
};
export const getMoviesByGenre = async (
    genreId: number, page: number = 1, sortBy: string = "popularity.desc"): Promise<IMoviesResponse> => {
    const response =
        await api.get<IMoviesResponse>(
            "/discover/movie",
            {params: {with_genres: genreId, page, sort_by: sortBy,},}
        );
    return response.data;
};
export const getMovieById = async (
    id: number): Promise<IMovieDetails> => {
    const response =
        await api.get<IMovieDetails>(`/movie/${id}`);
    return response.data;
};