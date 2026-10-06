import { useEffect } from "react";
import {fetchMovies, fetchGenres, searchMoviesThunk, fetchMoviesByGenre, setSearchQuery, setSelectedGenre, setSortBy,} from "../../Store/slices/movieSlice";
import {useAppDispatch, useAppSelector} from "../../Store/Hooks";
import MoviesList from "../../components/MoviesList/MoviesList";
import Search from "../../components/Search/Search";
import Genres from "../../components/Genres/Genres";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import "./MoviesPage.css";

const MoviesPage = () => {
    const dispatch = useAppDispatch();

    const {movies, genres, page, totalPages, searchQuery, selectedGenre, sortBy, loading, error,} = useAppSelector(
        (state) => state.movies
    );
    useEffect(() => {dispatch(fetchMovies({page: 1, sortBy,})
        );
        dispatch(fetchGenres());}, [dispatch]);

    const handleSearch = (query: string) => {
        dispatch(setSearchQuery(query));
        dispatch(setSelectedGenre(0));
        dispatch(searchMoviesThunk({query, page: 1,}));
    };

    const handleGenreSelect = (genreId: number) => {
        dispatch(setSelectedGenre(genreId));
        dispatch(setSearchQuery(""));
        if (genreId === 0) {dispatch(fetchMovies({page: 1, sortBy,}));
            return;
        }
        dispatch(fetchMoviesByGenre({genreId, page: 1, sortBy,}));
    };

    const handleSortChange = (newSort: string) => {
        dispatch(setSortBy(newSort));
        if (searchQuery) {dispatch(searchMoviesThunk({query: searchQuery, page: 1,}));
            return;
        }
        if (selectedGenre !== 0) {dispatch(fetchMoviesByGenre({genreId: selectedGenre, page: 1, sortBy: newSort,}));
            return;
        }
        dispatch(fetchMovies({page: 1, sortBy: newSort,}));
    };

    const handlePageChange = (newPage: number) => {
        if (newPage < 1 || newPage > totalPages) {
            return;
        }
        if (searchQuery) {dispatch(searchMoviesThunk({query: searchQuery, page: newPage,}));
        } else if (selectedGenre !== 0) {
            dispatch(fetchMoviesByGenre({genreId: selectedGenre, page: newPage, sortBy,}));
        } else {dispatch(fetchMovies({page: newPage, sortBy,}));
        }
        window.scrollTo({top: 0, behavior: "smooth",});
    };

    return (
        <main className="movies-page">
            <h1>Movies</h1>
            <Search onSearch={handleSearch}/>
            <Sort value={sortBy} onChange={handleSortChange}/>
            <Genres genres={genres} onGenreSelect={handleGenreSelect}/>
            {error && (<p className="movies-error">{error}</p>)}
            {loading && (<p className="movies-loading">Loading movies</p>)}
            {!loading && !error && movies.length === 0 && (<p className="movies-empty">No movies found</p>)}
            {!loading && movies.length > 0 && (<MoviesList movies={movies} genres={genres}/>)}
            {!loading && totalPages > 1 && (<Pagination page={page} totalPages={totalPages} onPageChange={handlePageChange}/>)}
        </main>
    );
};
export default MoviesPage;

