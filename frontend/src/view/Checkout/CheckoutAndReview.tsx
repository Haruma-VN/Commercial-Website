import { Link } from "react-router-dom";
import Book from "../../model/Book";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";
import "./CheckoutAndReview.css";

const CheckoutAndReview: React.FC<{ isMobile: boolean; book?: Book; showToast: () => void }> = ({ isMobile, book, showToast }) => {
    const { user } = useContext(UserContext)!;
    const [isLoading, setLoading] = useState<boolean>(user !== null);
    const [error, setError] = useState<string | null>(null);
    const [alreadyInCart, setAlreadyInCart] = useState<boolean>(false);
    useEffect(() => {
        if (user === null) return;
        const checkUrl: string = `http://localhost:3308/api/v1/cart/include/${user.email}/${book?.id}`;
        const fetchAndReview = async () => {
            const response = await fetch(checkUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra trong quá trình xử lý gửi request đến server");
            }
            setAlreadyInCart((await response.json()) as boolean);
        };

        fetchAndReview()
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, [book, user]);

    const onAddBookToCart = async () => {
        if (user === null) return;
        setLoading(true);
        const checkUrl: string = `http://localhost:3308/api/v1/cart/${user.email}/${book?.id}`;
        const fetchAndReview = async () => {
            const response = await fetch(checkUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra trong quá trình xử lý gửi request đến server");
            }
            setAlreadyInCart(true);
            showToast();
        };
        book!.copiesAvailable--;
        fetchAndReview()
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    };

    const purchaseBtn = () => {
        if (alreadyInCart) {
            return <div className="text-success">Sách đã ở trong giỏ hàng của bạn</div>;
        }
        return (
            <button onClick={onAddBookToCart} type="button" className="btn btn-success btn-lg">
                Mua hàng
            </button>
        );
    };

    if (isLoading) {
        return <Spinner />;
    }

    if (error !== null) {
        return <Exception message={error} />;
    }

    return (
        <>
            <div className={`card d-flex mt-5 ${isMobile ? "" : "col-3 container d-flex mb-5"}`}>
                <div className="card-body container">
                    <div className="mt-3">
                        <p>
                            <b>
                                {book!.copies - book!.copiesAvailable}/{book!.copies}
                            </b>{" "}
                            bản đã bán
                        </p>
                        <hr />
                        {book && book.copies > 0 ? <h4 className="text-success">Còn hàng</h4> : <h4 className="text-danger">Hết hàng</h4>}
                        <div className="row">
                            <p className="col-6 lead">
                                <b>{book?.copies}</b> bản
                            </p>
                            <p className="col-6 lead">
                                Còn lại <b>{book?.copiesAvailable}</b> bản
                            </p>
                        </div>
                    </div>
                    {user === null ? (
                        <Link to="/login" className="btn btn-success btn-lg">
                            Đăng nhập
                        </Link>
                    ) : (
                        purchaseBtn()
                    )}
                    <hr />
                    <p className="mt-3">Số lượng có thể thay đổi đến khi đơn hàng hoàn tất</p>
                    {user === null ? <p>Đăng nhập để bình luận</p> : <></>}
                </div>
            </div>
        </>
    );
};

export default CheckoutAndReview;
