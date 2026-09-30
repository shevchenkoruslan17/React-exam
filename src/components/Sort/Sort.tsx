import "./Sort.css";

export interface SortOption {
    value: string;
    label: string;
}
interface SortProps {
    value: string;
    onChange: (value: string) => void;
}
const Sort = ({ value, onChange }:SortProps)=> {
    return (
        <div className="sort">
            <label htmlFor="sort-select">
                Sort by:
            </label>
            <select id="sort-select" value={value} onChange={(event)=> onChange(event.target.value)}>
                <option value="popularity.desc">
                    Popularity
                </option>
                <option value="vote_average.desc">
                    Rating
                </option>
                <option value="primary_release_date.desc">
                    Release date
                </option>
                <option value="title.asc">
                    Title
                </option>
            </select>
        </div>
    )
}
export default Sort;
