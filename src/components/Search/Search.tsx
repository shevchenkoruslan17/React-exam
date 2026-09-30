import { useState } from "react";
import "./Search.css";

interface SearchProps {
    onSearch: (query: string) => void;
}

const Search = ({ onSearch }: SearchProps) => {
    const [query, setQuery] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            return;
        }

        onSearch(trimmedQuery);
    };

    return (
        <form className="search" onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search movies..."
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
};

export default Search;
