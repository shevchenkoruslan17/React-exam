import type { IMovie } from "../../models/IMovie";
import type { IGenre } from "../../models/IGenre";
import MoviesListCard from "../MoviesListCard/MoviesListCard";
import "./MoviesList.css";

interface MoviesListProps {
    movies: IMovie[];
    genres: IGenre[];
}
const MoviesList = ({movies,genres,}:MoviesListProps)=> {
    return (
        <div className="movies-list">
            {movies.map((movie) => (
                <MoviesListCard key={movie.id} movie={movie} genres={genres}/>
            ))}
        </div>
    );
};
export default MoviesList;