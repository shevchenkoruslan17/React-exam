import "./GenreBadge.css";
interface GenreBadgeProps {
    name: string;
}
const GenreBadge = ({name}:GenreBadgeProps)=> {
    return (
        <span className="genre-badge">
            {name}
        </span>
    );
};
export default GenreBadge;