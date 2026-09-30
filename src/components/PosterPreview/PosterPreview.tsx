import "./PosterPreview.css";
interface PosterPreviewProps {
    posterPath: string | null;
    title: string;
}
const PosterPreview = ({posterPath, title,}:PosterPreviewProps)=> {
    if (!posterPath) {
        return (
            <div className="poster-placeholder">
                No poster
            </div>
        );
    }
    return (
        <img className="poster" src={`https://image.tmdb.org/t/p/w500${posterPath}`} alt={title}/>
    )
}
export default PosterPreview;