import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Book from "../../model/Book";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";
import { Link, useNavigate } from "react-router-dom";

const CartPage = () => {
    const { user } = useContext(UserContext)!;
    const [books, setBook] = useState<Array<Book>>();
    const [isLoading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) return;
        const bookUrl = `http://localhost:3308/api/v1/cart/${user!.email}`;
        const fetchBooks = async () => {
            const response = await fetch(bookUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi lấy danh sách giỏ hàng");
            }
            setBook((await response.json()) as Array<Book>);
        };
        fetchBooks()
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    }, [user]);
    if (user === null) {
        return <Exception message="Hãy đăng nhập để xem giỏ hàng của bạn" />;
    }
    if (isLoading) {
        return <Spinner />;
    }
    if (error !== null) {
        return <Exception message={error} />;
    }
    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Giỏ hàng của bạn</h2>
            <div className="custom-cart d-flex flex-column">
                {books!.length > 0 ? (
                    books!.map((book) => (
                        <div className="card mb-4 shadow-sm" key={book.id} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <div className="image-container" style={{ flexShrink: 0 }}>
                                <img
                                    src={book.image}
                                    alt="Book"
                                    className="img-fluid rounded shadow-sm"
                                    width="123"
                                    height="196"
                                    style={{ opacity: 0.9, transition: "transform 0.3s", cursor: "pointer", marginLeft: 10 }}
                                    onClick={() => navigate(`/checkout/${book.id}`)}
                                />
                            </div>
                            <div className="card-body" style={{ flex: "1" }}>
                                <h5 className="card-title font-weight-bold">{book.title}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Tác giả: {book.author}</h6>
                                <p className="card-text d-none d-md-block">{book.description}</p>
                            </div>
                            <div className="col-md-2 col-sm-2 d-flex justify-content-center align-items-center">
                                <Link to={`/checkout/${book.id}`} className="btn btn-primary btn-sm my-custom-button">
                                    Xem chi tiết
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">Giỏ hàng của bạn đang trống</p>
                )}
            </div>
        </div>
    );
};

export default CartPage;
