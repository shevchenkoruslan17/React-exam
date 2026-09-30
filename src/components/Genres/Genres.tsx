import type { IGenre } from "../../models/IGenre";
import "./Genres.css";

interface GenresProps {
    genres: IGenre[];
    onGenreSelect: (genreId: number) => void;
}
const Genres = ({genres,onGenreSelect,}:GenresProps)=> {
    return (
        <div className="genres">
            <button type="button" onClick={() => onGenreSelect(0)}>
                All
            </button>
            {genres.map((genre) => (<button
                    key={genre.id}
                    type="button"
                    onClick={() => onGenreSelect(genre.id)}>
                    {genre.name}
                </button>
            ))}
        </div>
    );
};
export default Genres;