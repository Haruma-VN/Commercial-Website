import { Link } from "react-router-dom";
import Book from "../../../model/Book";

const SearchBook: React.FC<{ book: Book }> = ({ book }) => {
    const makeImage = () => {
        return <img src={book.image} alt="Book" width="123" height="196" />;
    };
    return (
        <div className="card mt-3 shadow p-3 mb-3 bg-body rounded">
            <div className="row g-0">
                <div className="col-md-2">
                    {/** Desktop or PC */}
                    <div className="d-none d-lg-block">{makeImage()}</div>
                    {/** Mobile */}
                    <div className="d-lg-none d-flex justify-content-center align-items-center">{makeImage()}</div>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <h5 className="card-title">{book.author}</h5>
                        <h4>{book.title}</h4>
                        <p className="card-text">{book.description}</p>
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-center align-items-center">
                    <Link to={`/checkout/${book.id}`} className="btn btn-md main-color text-white">
                        Xem chi tiết
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SearchBook;
