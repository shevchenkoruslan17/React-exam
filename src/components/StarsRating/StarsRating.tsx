import "./StarsRating.css";

interface StarsRatingProps {
    rating: number;
}
const StarsRating = ({rating}:StarsRatingProps)=> {
    const stars = Math.max(0, Math.min(5, Math.round(rating / 2)));
    return (
        <div className="stars-rating" aria-label={`Rating ${rating} out of 10`}>
            {"★".repeat(stars)}
            {"☆".repeat(5 - stars)}
        </div>
    )
}
export default StarsRating;