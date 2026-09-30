import type { IMovieDetails as IMovieDetailsModel } from "../../models/IMovieDetalis";
import StarsRating from "../StarsRating/StarsRating";
import GenreBadge from "../GenreBadge/GenreBadge";
import "./MovieDetalis.css";

interface MovieDetailsProps {
    movie: IMovieDetailsModel;
}
const MovieDetails = ({movie}:MovieDetailsProps)=> {
    return (
        <article className="movie-details">
            {movie.backdrop_path && (
                <img
                    className="movie-details-backdrop"
                    src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
                    alt={movie.title}/>
)}
<div className="movie-details-content">
    <div className="movie-details-poster">
        {movie.poster_path? (
            <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}/>
        ) : (
            <div className="movie-details-no-poster">
                No poster
            </div>
        )}
    </div>
    <div className="movie-details-info">
        <h1>{movie.title}</h1>
        <p>
            Release date:{" "}
            {movie.release_date || "Unknown"}
        </p>
        <div className="movie-details-rating">
            <StarsRating
                rating={movie.vote_average}/>
            <span>
                {movie.vote_average.toFixed(1)}/10
            </span>
        </div>
        <div className="movie-details-genres">
            {movie.genres.map((genre) => (
                <GenreBadge
                    key={genre.id}
                    name={genre.name}/>
            ))}
        </div>
        <p>
            {movie.overview || "No description available."}
        </p>
        <p>
            Votes: {movie.vote_count}
        </p>
        <p>
            Popularity:{" "}
            {movie.popularity.toFixed(1)}
        </p>
        <p>
            Runtime:{""}
            {movie.runtime? `${movie.runtime} min` : "Unknown"}
        </p>
    </div>
</div>
</article>
    )
}
export default MovieDetails;
