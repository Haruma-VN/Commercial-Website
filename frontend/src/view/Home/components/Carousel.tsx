import ReturnBook from "./ReturnBook";
import { useState, useEffect } from "react";
import Book from "../../../model/Book";
import Spinner from "../../Spinner/Spinner";
import Exception from "../../Exception/Exception";
import { Link } from "react-router-dom";

const Carousel = () => {
    // Books waiting for fetch
    const [books, setBook] = useState<Array<Book>>([]);
    // loading state : maybe on fetching time
    const [isLoading, setLoading] = useState<boolean>(true);
    // exception handling : if an exception is found
    const [httpError, setError] = useState<string | null>(null);
    useEffect(() => {
        const fetchBooks = async () => {
            const bookUrl: string = "http://localhost:3308/api/v1/book";
            const response = await fetch(bookUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            // Exception is found when fetching
            if (!response.ok) {
                // Kindly throw an error message
                throw new Error("Có lỗi xảy ra trong quá trình xử lý gửi request đến server");
            }
            setBook((await response.json()) as Array<Book>);
        };
        fetchBooks()
            .catch((e) => {
                setError(e.message!);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // The state is still handling

    if (isLoading) {
        return <Spinner />;
    }

    // error occur

    if (httpError !== null) {
        return <Exception message={httpError} />;
    }

    return (
        <div className="container mt-5" style={{ height: 550 }}>
            <div className="homepage-carousel-title">
                <h3>Tìm quyển sách bạn yêu thích</h3>
            </div>
            <div id="carouselExampleControls" className="carousel carousel-dark slide mt-5 d-none d-lg-block" data-bs-interval="false">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(0, 3).map((e) => (
                                <ReturnBook book={e} key={e.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(4, 7).map((e) => (
                                <ReturnBook book={e} key={e.id} />
                            ))}
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="row d-flex justify-content-center align-items-center">
                            {books.slice(7, 10).map((e) => (
                                <ReturnBook book={e} key={e.id} />
                            ))}
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Trước</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Sau</span>
                    </button>
                </div>
            </div>
            <div className="d-lg-none mt-3">
                <div className="row d-flex justify-content-center align-items-center">
                    <ReturnBook book={books[0]} key={books[0].id} />
                </div>
            </div>
            <div className="homepage-carousel-title mt-3">
                <Link to="/search" type="button" className="btn btn-outline-secondary btn-lg">
                    Xem thêm
                </Link>
            </div>
        </div>
    );
};

export default Carousel;
