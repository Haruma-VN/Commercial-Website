/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Review from "../../model/Review";
import { Link } from "react-router-dom";
import ClientReview from "./ClientReview";

const LatestReview: React.FC<{
    review: Array<Review>;
    bookId: number | undefined;
    isMobile: boolean;
}> = ({ review, bookId, isMobile }) => {
    return (
        <div className={isMobile ? "mt-3" : "row mt-5"}>
            <div className={isMobile ? "" : "col-sm-2 col-md-2"}>
                <h2>Đánh giá mới nhất</h2>
            </div>
            <div className="col-sm-10 col-md-10">
                {review.length > 0 ? (
                    <>
                        {review.slice(0, 3).map((e) => (
                            <ClientReview review={e} key={e.id} />
                        ))}
                        <div className="m-3">
                            <Link type="button" className="btn main-color btn-md text-white" to="#">
                                Xem tất cả bình luận
                            </Link>
                        </div>
                    </>
                ) : (
                    <div className="m-3">
                        <p className="lead">Chưa có đánh giá nào cho sản phẩm này.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LatestReview;
