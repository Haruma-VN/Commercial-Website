import { useEffect, useState } from "react";
import Book from "../../model/Book";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";
import SearchBook from "./components/SearchBook";
import "./SearchBookPage.css";

const SearchBookPage = () => {
    // Books waiting for fetch
    const [books, setBook] = useState<Array<Book>>([]);
    // loading state : on fetching time
    const [isLoading, setLoading] = useState<boolean>(true);
    // exception handling : if an exception is found
    const [httpError, setError] = useState<string | null>(null);
    // Search by title name
    const [searchTitle, setSearch] = useState<string>("");
    useEffect(() => {
        const fetchBooks = async () => {
            let bookUrl: string = "http://localhost:3308/api/v1/book";
            if (searchTitle !== "") {
                bookUrl += `/search/title/${searchTitle}`;
            }
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
                setError((e as Error).message);
            })
            .finally(() => {
                setLoading(false);
                window.scrollTo(0, 0);
            });
    }, [searchTitle, setSearch]);
    // The state is still handling

    if (isLoading) {
        return <Spinner />;
    }
    // error occur

    if (httpError !== null) {
        return <Exception message={httpError} />;
    }
    return (
        <div>
            <div className="container">
                <div>
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="input-group rounded-pill shadow-sm" style={{ overflow: "hidden" }}>
                                <input type="search" className="form-control border-0 rounded-start" placeholder="Tìm kiếm sách" aria-label="Tìm kiếm" onChange={(e) => setSearch(e.target.value)} style={{ padding: "10px 30px" }} />
                            </div>
                        </div>
                    </div>
                    <div className="mt-3">
                        <h5 className="text-secondary">Số sách tìm thấy: ({books.length})</h5>
                    </div>
                    {books.length > 0 ? books.map((e) => <SearchBook book={e} key={e.id} />) : <div className="mt-3 text-center text-muted">Không có sách nào được tìm thấy.</div>}
                </div>
            </div>
        </div>
    );
};

export default SearchBookPage;
