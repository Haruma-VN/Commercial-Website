import { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import Exception from '../../Exception/Exception';
import { getCookie } from 'typescript-cookie';
import Order from '../../../model/Order';

const OrderApprove = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<Array<Order>>([]);

	useEffect(() => {
		const fetchOrderStatus = async () => {
			const response = await fetch('http://localhost:3308/api/v1/order/status?statusId=1', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			});
			if (!response.ok) {
				throw new Error('Không thể lấy dữ liệu trạng thái đơn hàng');
			}
			return (await response.json()).content;
		};
		fetchOrderStatus()
			.then((data) => setOrders(data))
			.catch((err) => setError(err.message))
			.finally(() => setIsLoading(false));
	}, []);

	const removeOrderFromList = (orderId: number) => {
		setOrders(orders.filter((e) => e.orderId !== orderId));
	};

	const handleApprove = (orderId: number) => {
		setIsLoading(true);
		const fetchApproveOrder = async () => {
			const response = await fetch(
				`http://localhost:3308/api/v1/order/approve?orderId=${orderId}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				},
			);
			if (!response.ok) {
				throw new Error('Không thể chấp nhận trạng thái đơn hàng');
			}
			return await response.json();
		};
		fetchApproveOrder()
			.then(() => removeOrderFromList(orderId))
			.catch((err) => setError(err.message))
			.finally(() => setIsLoading(false));
	};

	const handleReject = (orderId: number) => {
		setIsLoading(true);
		const fetchApproveOrder = async () => {
			const response = await fetch(
				`http://localhost:3308/api/v1/order/cancel?orderId=${orderId}`,
				{
					method: 'PUT',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				},
			);
			if (!response.ok) {
				throw new Error('Không thể hủy đơn hàng');
			}
			return await response.json();
		};
		fetchApproveOrder()
			.then(() => removeOrderFromList(orderId))
			.catch((err) => setError(err.message))
			.finally(() => setIsLoading(false));
	};

	if (isLoading) {
		return <Spinner />;
	}

	if (error !== null) {
		return <Exception message={error} />;
	}

	return (
		<div className='container'>
			<table className='table table-striped'>
				<thead>
					<tr>
						<th>Mã đơn hàng</th>
						<th>Ngày đặt hàng</th>
						<th>Tổng giá</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.orderId}>
							<td>{order.orderId}</td>
							<td>{new Date(order.orderDate).toLocaleDateString()}</td>
							<td>{order.totalPrice.toFixed(3)} VND</td>
							<td>
								<button
									className='btn btn-primary me-2'
									onClick={() => handleApprove(order.orderId)}
								>
									Duyệt
								</button>
								<button
									className='btn btn-danger'
									onClick={() => handleReject(order.orderId)}
								>
									Từ chối
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderApprove;
