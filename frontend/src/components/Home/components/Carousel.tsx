import ReturnBook from './ReturnBook';
import { useState, useEffect } from 'react';
import Book from '../../../model/Book';
import Spinner from '../../Spinner/Spinner';
import Exception from '../../Exception/Exception';
import { Link } from 'react-router-dom';

const Carousel = () => {
	const [books, setBooks] = useState<Array<Book>>([]);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [httpError, setHttpError] = useState<string | null>(null);

	useEffect(() => {
		const fetchBooks = async () => {
			const bookUrl: string = 'http://localhost:3308/api/v1/book?page=1&limit=10';
			const response = await fetch(bookUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// Exception is found when fetching
			if (!response.ok) {
				// Kindly throw an error message
				throw new Error('Có lỗi xảy ra trong quá trình xử lý gửi request đến server');
			}
			const data = (await response.json()).content as Array<Book>;
			setBooks(data);
		};
		fetchBooks()
			.catch((e) => setHttpError(e.message!))
			.finally(() => setIsLoading(false));
	}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (httpError) {
		return <Exception message={httpError} />;
	}

	return (
		<div className='container mt-5'>
			<div className='text-center mb-4'>
				<h3 className='homepage-carousel-title'>Tìm quyển sách bạn yêu thích</h3>
			</div>
			<div
				id='carouselExampleControls'
				className='carousel slide carousel-fade d-none d-lg-block'
				data-bs-interval='false'
			>
				<div className='carousel-inner'>
					<div className='carousel-item active'>
						<div className='row d-flex justify-content-center align-items-center'>
							{books.slice(0, 3).map((book) => (
								<ReturnBook book={book} key={book.id} />
							))}
						</div>
					</div>
					<div className='carousel-item'>
						<div className='row d-flex justify-content-center align-items-center'>
							{books.slice(3, 6).map((book) => (
								<ReturnBook book={book} key={book.id} />
							))}
						</div>
					</div>
					<div className='carousel-item'>
						<div className='row d-flex justify-content-center align-items-center'>
							{books.slice(6, 9).map((book) => (
								<ReturnBook book={book} key={book.id} />
							))}
						</div>
					</div>
				</div>
				<button
					className='carousel-control-prev'
					type='button'
					data-bs-target='#carouselExampleControls'
					data-bs-slide='prev'
				>
					<span className='carousel-control-prev-icon' aria-hidden='true'></span>
					<span className='visually-hidden'>Trước</span>
				</button>
				<button
					className='carousel-control-next'
					type='button'
					data-bs-target='#carouselExampleControls'
					data-bs-slide='next'
				>
					<span className='carousel-control-next-icon' aria-hidden='true'></span>
					<span className='visually-hidden'>Sau</span>
				</button>
			</div>
			<div className='d-lg-none mt-3'>
				<div className='row d-flex justify-content-center align-items-center'>
					<ReturnBook book={books[0]} key={books[0].id} />
				</div>
			</div>
			<div className='text-center mt-4'>
				<Link to='/search' className='btn btn-outline-secondary btn-lg'>
					Xem thêm
				</Link>
			</div>
		</div>
	);
};

export default Carousel;
