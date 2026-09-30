import { useEffect,useState } from "react";
import {getMovies,searchMovies,getMoviesByGenre,} from "../../services/movie.service";
import { getGenres } from "../../services/genre.service";
import type { IMovie } from "../../models/IMovie";
import type { IGenre } from "../../models/IGenre";
import MoviesList from "../../components/MoviesList/MoviesList";
import Search from "../../components/Search/Search";
import Genres from "../../components/Genres/Genres";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import "./MoviesPage.css";

const MoviesPage = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [genres, setGenres] = useState<IGenre[]>([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedGenre, setSelectedGenre] = useState(0);
    const [sortBy, setSortBy] = useState("popularity.desc");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadInitialData = async () => {
            try {
                setLoading(true);
                setError("");
                const [moviesData, genresData] = await Promise.all([
                    getMovies(1, sortBy),
                    getGenres(),
                ]);
                setMovies(moviesData.results);
                setPage(moviesData.page);
                setTotalPages(moviesData.total_pages);
                setGenres(genresData.genres);
            } catch (error) {
                console.error(error);
                setError("Failed to load movies. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        loadInitialData();
    }, []);
    const handleSearch = async (query: string) => {
        try {
            setLoading(true);
            setError("");
            setSearchQuery(query);
            setSelectedGenre(0);
            setPage(1);

            const data = await searchMovies(query, 1);
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
            setError("Failed to search movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    const handleGenreSelect = async (genreId: number) => {
        try {
            setLoading(true);
            setError("");
            setSelectedGenre(genreId);
            setSearchQuery("");
            setPage(1);

            if (genreId === 0) {
                const data = await getMovies(1, sortBy);
                setMovies(data.results);
                setPage(data.page);
                setTotalPages(data.total_pages);
                return;
            }
            const data = await getMoviesByGenre(
                genreId,
                1,
                sortBy
            );
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
            setError("Failed to load movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    const handleSortChange = async (newSort: string) => {
        try {
            setLoading(true);
            setError("");
            setSortBy(newSort);
            setPage(1);
            let data;
            if (searchQuery) {data = await searchMovies(searchQuery, 1);
            } else if (selectedGenre !== 0) {
                data = await getMoviesByGenre(
                    selectedGenre, 1, newSort);
            } else {
                data = await getMovies(1, newSort);
            }
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
        } catch (error) {
            console.error(error);
            setError("Failed to sort movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    const handlePageChange = async (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        try {
            setLoading(true);
            setError("");
            let data;
            if (searchQuery) {
                data = await searchMovies(searchQuery, newPage);
            } else if (selectedGenre !== 0) {
                data = await getMoviesByGenre(selectedGenre, newPage, sortBy);
            } else {
                data = await getMovies(newPage, sortBy);
            }
            setMovies(data.results);
            setPage(data.page);
            setTotalPages(data.total_pages);
            window.scrollTo({top: 0, behavior: "smooth",});
        } catch (error) {
            console.error(error);
            setError("Failed to load movies. Please try again.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <main className="movies-page">
            <h1>Movies</h1>
            <Search onSearch={handleSearch} />
            <Sort value={sortBy} onChange={handleSortChange}/>
            <Genres genres={genres} onGenreSelect={handleGenreSelect}/>
            {error && (<p className="movies-error">{error}</p>)}
            {loading && (<p className="movies-loading">Loading movies...</p>)}
            {!loading && !error && movies.length === 0 && (<p className="movies-empty">No movies found.</p>)}
            {!loading && movies.length > 0 && (<MoviesList movies={movies} genres={genres}/>)}
            {!loading && totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>)}
        </main>
    )
}
export default MoviesPage;
