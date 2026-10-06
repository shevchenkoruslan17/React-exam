import {useEffect,} from "react";
import {Link, useParams,} from "react-router-dom";
import {fetchMovieDetails,clearMovieDetails,} from "../../Store/slices/movieDetalisSlice";
import {useAppDispatch, useAppSelector,} from "../../Store/Hooks";
import MovieDetails from "../../components/MovieDetalis/MovieDetalis";
import "./MovieDetalisPage.css";

const MovieDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useAppDispatch();
    const {movie, loading, error,} = useAppSelector((state) => state.movieDetails);
    useEffect(() => {
        if (!id) {
            return;
        }
        const movieId = Number(id);
        if (Number.isNaN(movieId)) {
            return;
        }
        dispatch(fetchMovieDetails(movieId));
        return () => {dispatch(clearMovieDetails());};}, [dispatch, id]);

    return (
        <main className="movie-details-page">
            <Link to="/movies" className="back-to-movies">← Back to movies</Link>
            {loading && (<p className="movie-details-loading">Loading movie</p>)}
            {error && (<p className="movie-details-error">{error}</p>)}
            {!loading && !error && movie && (<MovieDetails movie={movie}/>)}
        </main>
    );
};
export default MovieDetailsPage;