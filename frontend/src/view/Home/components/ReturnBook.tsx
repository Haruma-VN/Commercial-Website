import { Link } from "react-router-dom";
import Book from "../../../model/Book";
import "./ReturnBook.css";

const ReturnBook: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="book-card text-center shadow rounded">
                <img src={book.image} className="book-image" alt="book" />
                <h6 className="mt-2 book-title">{book.title}</h6>
                <p className="book-author">{book.author}</p>
                <Link className="btn fancy-btn" type="button" onClick={() => window.scrollTo(0, 0)} to={`/checkout/${book.id}`}>
                    Xem thêm
                </Link>
            </div>
        </div>
    );
};

export default ReturnBook;
