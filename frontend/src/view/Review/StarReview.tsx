import Star from "./Star";
import StarBlank from "./StarBlank";

const StarReview: React.FC<{ rating: number; size: number }> = ({ rating, size }) => {
    let goodRating = 0;
    let badRating = 5;
    while (rating--) {
        goodRating++;
        badRating--;
    }
    return (
        <div>
            {Array.from({ length: goodRating }).map((_, i) => (
                <Star key={i} size={size} />
            ))}
            {Array.from({ length: badRating }).map((_, i) => (
                <StarBlank key={i} size={size} />
            ))}
        </div>
    );
};

export default StarReview;
