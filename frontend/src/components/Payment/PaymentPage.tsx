import React, { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate, useParams } from 'react-router-dom';
import Exception from '../Exception/Exception';
import Spinner from '../Spinner/Spinner';
import { getCookie } from 'typescript-cookie';

const PaymentPage: React.FC = () => {
	const { user } = useContext(UserContext)!;
	const [customerName, setCustomerName] = useState<string>(user?.userDetail?.name ?? '');
	const [phoneNumber, setPhoneNumber] = useState<string>(user?.userDetail?.phoneNumber ?? '');
	const [address, setAddress] = useState<string>('');
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const { id } = useParams();

	if (user === null) {
		return <Exception message='Hãy đăng nhập để sử dụng tính năng này' />;
	}

	if (isLoading) {
		return <Spinner />;
	}

	if (error !== null) {
		return <Exception message={error} />;
	}

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		const fetchPayment = async () => {
			const response = await fetch('http://localhost:3308/api/v1/order', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: user.email,
					address: {
						addressName: address,
					},
					bookId: id,
					quantity: 1,
				}),
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra trong quá trình thêm đơn hàng');
			}
			return await response.json();
		};
		fetchPayment()
			.then(() => navigate(`/payment/${id}/success`))
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	};

	return (
		<div className='container mt-5 d-flex justify-content-center'>
			<div className='card shadow p-4' style={{ maxWidth: '600px', width: '100%' }}>
				<div className='card-body'>
					<h2 className='mb-4 text-center'>Trang Thanh Toán</h2>
					<form onSubmit={handleSubmit}>
						<div className='mb-3'>
							<label htmlFor='customerName' className='form-label'>
								Tên khách hàng
							</label>
							<input
								type='text'
								className='form-control'
								id='customerName'
								value={customerName}
								onChange={(e) => setCustomerName(e.target.value)}
								required
								disabled={true}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='phoneNumber' className='form-label'>
								Số điện thoại
							</label>
							<input
								type='tel'
								className='form-control'
								id='phoneNumber'
								value={phoneNumber}
								onChange={(e) => setPhoneNumber(e.target.value)}
								required
								disabled={true}
							/>
						</div>
						<div className='mb-3'>
							<label htmlFor='address' className='form-label'>
								Địa chỉ
							</label>
							<textarea
								className='form-control'
								id='address'
								rows={3}
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								required
							></textarea>
						</div>
						<div className='mb-3'>
							<h5>Phương thức thanh toán</h5>
							<div className='form-check'>
								<input
									className='form-check-input'
									type='radio'
									name='paymentMethod'
									id='cod'
									value='Thanh toán khi giao hàng'
									checked
									readOnly
								/>
								<label className='form-check-label' htmlFor='cod'>
									Thanh toán khi giao hàng
								</label>
							</div>
						</div>
						<button type='submit' className='btn btn-primary w-100'>
							Xác nhận Thanh Toán
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default PaymentPage;
