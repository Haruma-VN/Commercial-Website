import React from "react";
import Review from "../../model/Review";
import StarReview from "../Review/StarReview";

const ClientReview: React.FC<{ review: Review }> = ({ review }) => {
    const date = new Date(review.date);
    const month = date.getMonth() + 1;
    const day = date.getDay();
    const year = date.getFullYear();
    const timeLine = `${date.getHours()}:${date.getMinutes()}`;
    return (
        <div>
            <div className="col-sm-8 col-md-8">
                <h5>{review.username}</h5>
                <div className="row">
                    <div className="col">
                        <h6>{`${day}/${month}/${year} lúc ${timeLine}`}</h6>
                    </div>
                    <div className="col">
                        <StarReview rating={review.rating} size={16} />
                    </div>
                </div>
                <div className="mt-2">
                    <p>{review.description}</p>
                </div>
            </div>
        </div>
    );
};

export default ClientReview;
