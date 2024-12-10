import React, { useState, useContext } from 'react';
import Review from '../../model/Review';
import { Link } from 'react-router-dom';
import ClientReview from '../Review/ClientReview';
import './LatestReview.css';
import { UserContext } from '../../context/UserContext';
import Star from '../Review/Star';
import StarBlank from '../Review/StarBlank';
import { getCookie } from 'typescript-cookie';

const LatestReview: React.FC<{
	review: Array<Review>;
	bookId: number | undefined;
	isMobile: boolean;
	setReview: React.Dispatch<React.SetStateAction<Review[]>>;
}> = ({ review, bookId, isMobile, setReview }) => {
	const { user } = useContext(UserContext)!;
	const [newReview, setNewReview] = useState<string>('');
	const [rating, setRating] = useState<number>(0);
	const [hoveredRating, setHoveredRating] = useState<number | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (newReview.trim() === '') return;
		const fetchReview = async () => {
			const reviewUrl: string = `http://localhost:3308/api/v1/review/${bookId!}`;
			const data = {
				description: newReview,
				rating: rating,
				userEmail: user!.email,
				username: user!.userDetail.name,
			};
			const response = await fetch(reviewUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				body: JSON.stringify(data),
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra trong quá trình xử lý gửi request đến server');
			}
			setReview([{ ...data, date: Date.now() as never } as any, ...review]);
		};
		fetchReview().finally(() => {
			setNewReview('');
			setRating(0);
			setHoveredRating(null);
		});
	};

	return (
		<div className={isMobile ? 'mt-3' : 'row mt-5'}>
			<div className={isMobile ? '' : 'col-sm-2 col-md-2'}>
				<h2 className='latest-reviews-title'>Đánh giá mới nhất</h2>
			</div>
			<div className='col-sm-10 col-md-10 latest-reviews-container'>
				{user !== null && (
					<div className='mt-4'>
						<h4 className='text-muted'>Bình luận:</h4>
						<div className='d-flex align-items-start mb-3'>
							<div
								className='star-rating d-flex'
								style={{ cursor: 'pointer', marginRight: '1rem' }}
							>
								{Array.from({ length: 5 }, (_, index) => (
									<div
										key={index}
										onMouseEnter={() => setHoveredRating(index + 1)}
										onClick={() => setRating(index + 1)}
									>
										{hoveredRating !== null && hoveredRating > index ? (
											<Star size={20} />
										) : (
											<StarBlank size={20} />
										)}
									</div>
								))}
							</div>
							<form onSubmit={handleSubmit} className='flex-grow-1'>
								<div className='input-group'>
									<textarea
										className='form-control'
										placeholder='Nhập đánh giá của bạn...'
										value={newReview}
										onChange={(e) => setNewReview(e.target.value)}
										rows={3}
										required
									/>
									<button
										className='btn btn-primary'
										type='submit'
										style={{
											backgroundColor: '#007bff',
											borderColor: '#007bff',
										}}
									>
										Gửi
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
				{review.length > 0 ? (
					<>
						{review.slice(0, 3).map((e) => (
							<ClientReview review={e} key={e.id} />
						))}
						<div className='m-3 text-center'>
							<Link
								type='button'
								className='btn btn-lg see-all-btn'
								to={`/review/${bookId}`}
								style={{
									backgroundColor: '#007bff',
									borderColor: '#007bff',
									color: '#fff',
									borderRadius: '50px',
									padding: '10px 20px',
									fontWeight: 'bold',
									transition: 'background-color 0.3s, transform 0.3s',
								}}
								onMouseEnter={(e) => {
									e.currentTarget.style.backgroundColor = '#0056b3';
									e.currentTarget.style.transform = 'scale(1.05)';
								}}
								onMouseLeave={(e) => {
									e.currentTarget.style.backgroundColor = '#007bff';
									e.currentTarget.style.transform = 'scale(1)';
								}}
							>
								Xem tất cả bình luận
							</Link>
						</div>
					</>
				) : (
					<div className='m-3 text-center no-reviews'>
						<p className='lead'>Chưa có đánh giá nào cho sản phẩm này.</p>
					</div>
				)}
			</div>
		</div>
	);
};

export default LatestReview;
