import { useCallback, useEffect, useState } from 'react';
import Book from '../../model/Book';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import SearchBook from './components/SearchBook';
import './SearchBookPage.css';

const SearchBookPage = () => {
    const [books, setBook] = useState<Array<Book>>([]);
    const [isLoading, setLoading] = useState<boolean>(true);
    const [httpError, setError] = useState<string | null>(null);
    const [searchTitle, setSearch] = useState<string>('');
    const [title, setTitle] = useState<string>('');
    const [page, setPage] = useState<number>(0);

    const fetchBooks = useCallback(
        async (currentPage: number) => {
            setLoading(true);
            let bookUrl: string = 'http://localhost:3308/api/v1/book';
            if (searchTitle !== '') {
                bookUrl += `/search/title/${searchTitle}`;
            }
            bookUrl += `?page=${currentPage}&limit=10`;
            try {
                console.log(bookUrl);
                const response = await fetch(bookUrl, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Có lỗi xảy ra trong quá trình xử lý gửi request đến server');
                }
                const data = (await response.json()) as any;
                if (data.content !== undefined) {
                    setBook(data.content);
                } else {
                    setBook(data);
                }
            } catch (e) {
                setError((e as Error).message);
            } finally {
                setLoading(false);
                window.scrollTo(0, 0);
            }
        },
        [searchTitle],
    );

    useEffect(() => {
        fetchBooks(page);
    }, [fetchBooks, page, searchTitle]);

    if (isLoading) {
        return <Spinner />;
    }

    if (httpError !== null) {
        return <Exception message={httpError} />;
    }

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 0) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-12'>
                            <div
                                className='input-group rounded-pill shadow-sm'
                                style={{ overflow: 'hidden' }}
                            >
                                <input
                                    type='search'
                                    className='form-control border-0 rounded-start'
                                    placeholder='Tìm kiếm sách'
                                    aria-label='Tìm kiếm'
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    style={{ padding: '10px 30px' }}
                                />
                                <button
                                    className='btn btn-primary'
                                    onClick={() => setSearch(title)}
                                >
                                    Tìm kiếm
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5 className='text-secondary'>Số sách tìm thấy: ({books.length})</h5>
                    </div>
                    {books.length > 0 ? (
                        books.map((e) => <SearchBook book={e} key={e.id} />)
                    ) : (
                        <div className='mt-3 text-center text-muted'>
                            Không có sách nào được tìm thấy.
                        </div>
                    )}
                    <div className='pagination-controls mt-3 mb-3 d-flex justify-content-center'>
                        <button
                            className='btn btn-secondary me-2'
                            onClick={handlePreviousPage}
                            disabled={page === 0}
                        >
                            Trang trước
                        </button>
                        <button className='btn btn-primary' onClick={handleNextPage}>
                            Trang tiếp theo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchBookPage;
