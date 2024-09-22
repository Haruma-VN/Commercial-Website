import { Link } from "react-router-dom";
import Book from "../../../model/Book";

const ReturnBook: React.FC<{ book: Book }> = ({ book }) => {
    return (
        <div className="col-xs-6 col-sm-6 col-md-4 col-lg-3 mb-3">
            <div className="text-center">
                <img src={book.image} width="151" height="233" alt="book" />
                <h6 className="mt-2">{book.title}</h6>
                <p>{book.author}</p>
                <Link className="btn main-color text-white" type="button" onClick={() => window.scrollTo(0, 0)} to={`/checkout/${book.id}`}>
                    Xem thêm
                </Link>
            </div>
        </div>
    );
};

export default ReturnBook;
