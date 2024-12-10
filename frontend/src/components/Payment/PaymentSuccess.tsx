import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess: React.FC = () => {
	const navigate = useNavigate();
	return (
		<div className='container text-center mt-5'>
			<div className='card shadow p-4'>
				<div className='card-body'>
					<h1 className='text-success mb-3'>
						<i className='bi bi-check-circle'></i> Thành Công!
					</h1>
					<p className='lead'>
						Cảm ơn bạn đã đặt hàng! Đơn hàng của bạn đã được ghi nhận và đang được xử
						lý.
					</p>
					<p className='text-muted'>Bạn sẽ nhận được thông báo khi đơn hàng được giao.</p>
					<div className='mt-4'>
						<button className='btn btn-primary' onClick={() => navigate('/home')}>
							Về Trang Chủ
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PaymentSuccess;
