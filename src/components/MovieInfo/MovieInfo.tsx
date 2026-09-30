import type { IMovie } from "../../models/IMovie";
import type { IGenre } from "../../models/IGenre";
import StarsRating from "../StarsRating/StarsRating";
import GenreBadge from "../GenreBadge/GenreBadge";
import "./MovieInfo.css";

interface MovieInfoProps {
    movie: IMovie;
    genres: IGenre[];
}
const MovieInfo = ({movie,genres,}: MovieInfoProps)=> {
    const movieGenres = genres.filter((genre) =>
        movie.genre_ids.includes(genre.id)
    );
    return (
        <div className="movie-info">
            <h2 className="movie-title">
                {movie.title}
            </h2>
            <p className="movie-date">
                Release date:{" "}{movie.release_date || "Unknown"}
            </p>
            <div className="movie-rating">
                <StarsRating
                    rating={movie.vote_average}/>
                <span className="movie-rating-value">
                    {movie.vote_average.toFixed(1)}
                </span>
            </div>
            <div className="movie-genres">
                {movieGenres.map((genre) => (
                    <GenreBadge key={genre.id} name={genre.name}/>
                ))}
            </div>
            <p className="movie-description">
                {movie.overview || "No description available."}
            </p>
        </div>
    )
}
export default MovieInfo;