import { useEffect, useState } from 'react';
import Book from '../../model/Book';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import StarReview from '../Review/StarReview';
import CheckoutAndReview from './CheckoutAndReview';
import Review from '../../model/Review';
import LatestReview from './LatestReview';
import Toast from '../Toast/Toast';
import { useParams } from 'react-router-dom';

const BookCheckoutPage = () => {
	const [book, setBook] = useState<Book>();
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [review, setReview] = useState<Array<Review>>([]);
	const [totalStar, setTotalStar] = useState<number>(0);
	const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);
	const [toastVisible, setToastVisible] = useState<boolean>(false);

	const showToast = () => {
		setToastVisible(true);
		setTimeout(() => {
			setToastVisible(false);
		}, 3000);
	};
	const { id } = useParams();
	useEffect(() => {
		const fetchBooks = async () => {
			const bookUrl: string = `http://localhost:3308/api/v1/book/${id}`;
			const response = await fetch(bookUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// Exception is found when fetching
			if (!response.ok) {
				// Kindly throw an error message
				throw new Error(
					'Có lỗi xảy ra trong quá trình xử lý gửi request đến server, không thể lấy thông tin sách',
				);
			}
			setBook((await response.json()) as Book);
		};
		fetchBooks()
			.catch((e) => {
				setError(e.message!);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [id]);

	useEffect(() => {
		const fetchReview = async () => {
			const reviewUrl: string = `http://localhost:3308/api/v1/review/search/${id}`;
			const response = await fetch(reviewUrl, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			});
			// Exception is found when fetching
			if (!response.ok) {
				// Kindly throw an error message
				throw new Error(
					'Có lỗi xảy ra trong quá trình xử lý gửi request đến server, không thể lấy đánh giá',
				);
			}
			const review = (await response.json()) as Array<Review>;
			if (review.length > 0) {
				const star = Math.round(review.reduce((a, b) => a + b.rating, 0) / review.length);
				setTotalStar(star);
			}
			console.log(review);
			setReview(review);
		};
		fetchReview()
			.catch((e) => setError(e.message!))
			.finally(() => setIsLoadingReview(false));
	}, [id]);

	// The state is still handling

	if (isLoading) {
		return <Spinner />;
	}

	if (isLoadingReview) {
		return <Spinner />;
	}

	// error occur

	if (error !== null) {
		return <Exception message={error} />;
	}
	return (
		<div>
			<Toast
				onClose={() => setToastVisible(false)}
				isVisible={toastVisible}
				message='Đã thêm sách thành công'
				bgColor='success'
			/>
			<div className='container d-none d-lg-block'>
				<div className='row mt-5'>
					<div className='col-sm-2 col-md-2'>
						<img
							src={book!.image}
							alt='book'
							width='226'
							height='349'
							className='img-fluid'
						/>
					</div>
					<div className='col-4 col-md-4 container'>
						<div className='ml-2'>
							<h2>{book!.title}</h2>
							<h5 className='text-primary'>{book!.author}</h5>
							<p className='lead'>{book!.description}</p>
							<StarReview rating={4} size={20} />
						</div>
					</div>
					<CheckoutAndReview
						book={book}
						key={book!.id}
						isMobile={false}
						showToast={showToast}
					/>
					<hr className='mt-4' />
					<LatestReview
						bookId={book!.id}
						isMobile={false}
						review={review}
						setReview={setReview}
					/>
				</div>
			</div>
			<div className='container d-lg-none mt-5'>
				<div className='d-flex justify-content-center align-items-center'>
					<img
						src={book!.image}
						alt='book'
						width='226'
						height='349'
						className='img-fluid'
					/>
				</div>
				<div className='mt-4'>
					<div className='ml-2'>
						<h2>{book!.title}</h2>
						<h5 className='text-primary'>{book!.author}</h5>
						<p className='lead'>{book!.description}</p>
						<StarReview rating={totalStar} size={20} />
					</div>
				</div>
				<CheckoutAndReview
					book={book}
					key={book!.id}
					isMobile={true}
					showToast={showToast}
				/>
				<hr />
				<LatestReview
					bookId={book!.id}
					isMobile={true}
					review={review}
					setReview={setReview}
				/>
			</div>
		</div>
	);
};

export default BookCheckoutPage;
