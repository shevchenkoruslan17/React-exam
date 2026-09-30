import {BrowserRouter, Navigate, Route, Routes,} from "react-router-dom";
import Header from "./components/Header/Header";
import MoviesPage from "./containers/MoviesPage/MoviesPages";
import MovieDetailsPage from "./containers/MovieDetalisPage/MovieDetalisPage";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/movies" element={<MoviesPage />}/>
                <Route path="/movies/:id" element={<MovieDetailsPage />}/>
                <Route path="/" element={<Navigate to="/movies" replace/>}/>
                <Route path="*" element={<Navigate to="/movies" replace/>}/>
            </Routes>
        </BrowserRouter>
    )
}
export default App;
