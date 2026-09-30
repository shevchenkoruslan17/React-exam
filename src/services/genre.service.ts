import { api } from "./api.service";
import type { IGenre } from "../models/IGenre";

export interface IGenresResponse {
    genres: IGenre[];
}
export const getGenres = async (): Promise<IGenresResponse> => {
    const response = await api.get<IGenresResponse>("/genre/movie/list");
    return response.data;
};