import type { IGenre } from "./IGenre";

export interface IMovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    vote_count: number;
    popularity: number;
    genres: IGenre[];
    runtime: number | null;
}