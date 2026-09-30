import { useEffect, useState } from "react";
import { getMovies } from "../../services/movie.service";
import type { IMovie } from "../../models/IMovie";

const MoviesPage = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);

    useEffect(() => {
        getMovies()
            .then((data) => {
                setMovies(data.results);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    console.log(movies);

    return (
        <div>
            <h1>Movies</h1>
        </div>
    );
};

export default MoviesPage;
