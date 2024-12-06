import { useEffect, useState } from "react";
import ClientReview from "./ClientReview";
import Review from "../../model/Review";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";

const ReviewPage = () => {
    const id = window.location.pathname.split("/")[2];
    const [reviews, setReview] = useState<Array<Review>>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchReview = async () => {
            const reviewUrl: string = `http://localhost:3308/api/v1/review/search/${id}`;
            const response = await fetch(reviewUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra trong quá trình xử lý gửi request đến server");
            }
            setReview((await response.json()) as Array<Review>);
        };
        fetchReview()
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (isLoading) {
        return <Spinner />;
    }

    if (error !== null) {
        return <Exception message={error} />;
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Tất cả bình luận</h2>
            <div className="row">
                {reviews.length > 0 ? (
                    <div className="col-12">
                        <div className="border rounded p-3">
                            {reviews.map((review) => (
                                <div className="mb-2" key={review.id}>
                                    <ClientReview review={review} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="col-12 text-center">
                        <p className="lead">Chưa có đánh giá nào cho sản phẩm này.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewPage;
