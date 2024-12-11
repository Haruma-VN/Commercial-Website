import { useEffect, useState } from 'react';
import Spinner from '../../Spinner/Spinner';
import Exception from '../../Exception/Exception';
import Order from '../../../model/Order';
import { getCookie } from 'typescript-cookie';

const OrderApprove = () => {
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<Array<Order>>([]);

	useEffect(() => {
		const fetchOrderStatus = async () => {
			const response = await fetch('http://localhost:3308/api/v1/order/status?statusId=3', {
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
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.orderId}>
							<td>{order.orderId}</td>
							<td>{new Date(order.orderDate).toLocaleDateString()}</td>
							<td>{order.totalPrice.toLocaleString()} VND</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default OrderApprove;
