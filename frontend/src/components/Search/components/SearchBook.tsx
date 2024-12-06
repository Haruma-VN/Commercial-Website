import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Book from "../../../model/Book";
import "./SearchBook.css";

const SearchBook: React.FC<{ book: Book }> = ({ book }) => {
    const navigate = useNavigate();

    const makeImage = () => {
        return <img src={book.image} alt="Book" className="img-fluid rounded shadow-sm" width="123" height="196" style={{ opacity: 0.9, transition: "transform 0.3s", cursor: "pointer" }} onClick={() => navigate(`/checkout/${book.id}`)} />;
    };

    return (
        <div className="card mt-3 shadow-lg p-3 mb-4 bg-light rounded" style={{ transition: "transform 0.3s", opacity: 0.95 }}>
            <div className="row g-0">
                <div className="col-md-2">
                    <div className="d-none d-lg-block">
                        <div className="image-container">{makeImage()}</div>
                    </div>
                    <div className="d-lg-none d-flex justify-content-center align-items-center">
                        <div className="image-container">{makeImage()}</div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title text-primary fw-bold">{book.author}</h5>
                        <h4 className="card-title text-dark">{book.title}</h4>
                        <p className="card-text text-muted" style={{ height: "50px", overflow: "hidden" }}>
                            {book.description}
                        </p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-end align-items-center">
                    <Link to={`/checkout/${book.id}`} className="btn btn-primary btn-md text-white shadow-sm">
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchBook;
