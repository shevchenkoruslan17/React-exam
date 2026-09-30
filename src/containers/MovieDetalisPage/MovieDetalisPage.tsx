import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getMovieById} from "../../services/movie.service";
import type { IMovieDetails } from "../../models/IMovieDetalis";
import MovieDetails from "../../components/MovieDetalis/MovieDetalis";

const MovieDetailsPage = () => {
    const {id} = useParams<{ id: string }>();
    const [movie, setMovie] = useState<IMovieDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadMovie = async () => {
            if (!id) {
                setError("Movie ID is missing.");
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                setError("");
                const data = await getMovieById(
                    Number(id)
                );
                setMovie(data);
            } catch {
                setError("Failed to load movie.");
            } finally {
                setLoading(false);
            }
        }
        loadMovie();
    }, [id]);
    if (loading) {
        return <p>Loading movie...</p>;
    }
    if (error) {
        return (
            <div>
                <p>{error}</p>
                <Link to="/movies">
                    Back to movies
                </Link>
            </div>
        )
    }
    if (!movie) {
        return (
            <div>
                <p>Movie not found.</p>
                <Link to="/movies">
                    Back to movies
                </Link>
            </div>
        )
    }
    return (
        <main>
            <Link to="/movies">
                ← Back to movies
            </Link>
            <MovieDetails movie={movie} />
        </main>
    )
}
export default MovieDetailsPage;