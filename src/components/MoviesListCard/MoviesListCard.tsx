import { Link } from "react-router-dom";
import type { IMovie } from "../../models/IMovie";
import type { IGenre } from "../../models/IGenre";
import PosterPreview from "../PosterPreview/PosterPreview";
import MovieInfo from "../MovieInfo/MovieInfo";
import "./MoviesListCard.css";

interface MoviesListCardProps {
    movie: IMovie;
    genres: IGenre[];
}
const MoviesListCard = ({movie, genres,}:MoviesListCardProps)=> {
    return (
        <Link className="movie-card-link" to={`/movies/${movie.id}`}>
            <article className="movie-card">
                <PosterPreview posterPath={movie.poster_path} title={movie.title}/>
                <MovieInfo movie={movie} genres={genres}/>
            </article>
        </Link>
    );
};
export default MoviesListCard;