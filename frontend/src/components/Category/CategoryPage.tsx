import { useCallback, useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import Book from '../../model/Book';
import SearchBook from '../Search/components/SearchBook';
import { useParams } from 'react-router-dom';

const CategoryPage = () => {
	const [books, setBook] = useState<Array<Book>>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const [httpError, setError] = useState<string | null>(null);
	const [page, setPage] = useState<number>(0);
	const { id } = useParams();

	const fetchBooks = useCallback(
		async (currentPage: number) => {
			setLoading(true);
			const bookUrl: string = `http://localhost:3308/api/v1/book/category/${id}?page=${currentPage}&limit=10`;
			try {
				const response = await fetch(bookUrl, {
					method: 'GET',
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
		[id],
	);

	useEffect(() => {
		fetchBooks(page);
	}, [fetchBooks, page]);

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
		</div>
	);
};

export default CategoryPage;
