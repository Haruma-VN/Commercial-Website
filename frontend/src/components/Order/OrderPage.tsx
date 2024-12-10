import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import Exception from '../Exception/Exception';
import { Table } from 'react-bootstrap';
import Spinner from '../Spinner/Spinner';
import Order from '../../model/Order';
import { getCookie } from 'typescript-cookie';
import { Link } from 'react-router-dom';
import Toast from '../Toast/Toast';

const OrderPage = () => {
	const { user } = useContext(UserContext)!;
	const [isLoading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [orders, setOrders] = useState<Array<Order>>([]);
	const [snackbar, setSnackbar] = useState<[string, 'danger' | 'info' | 'success']>(['', 'info']);
	const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
	useEffect(() => {
		if (user === null) return;
		const fetchOrders = async () => {
			const response = await fetch(
				`http://localhost:3308/api/v1/order/user?userId=${user?.id}&page=0&limit=100`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				},
			);
			if (!response.ok) {
				throw new Error('Không thể lấy dữ liệu đơn hàng');
			}
			return await response.json();
		};
		fetchOrders()
			.then((e) => {
				setOrders(e.content);
				console.log(e.content);
			})
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, [user]);
	if (user === null) {
		return <Exception message='Hãy đăng nhập để xem danh sách đơn hàng của bạn' />;
	}
	if (isLoading) {
		return <Spinner />;
	}
	if (error !== null) {
		return <Exception message={error} />;
	}
	const onDelete = (id: number) => {
		setLoading(true);
		const deleteOrder = async () => {
			const response = await fetch(`http://localhost:3308/api/v1/order/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra trong quá trình xóa đơn hàng');
			}
			return await response.json();
		};
		deleteOrder()
			.then(() => setOrders([...orders.filter((e) => e.orderId !== id)]))
			.then(() => setSnackbar(['Xóa thành công', 'success']))
			.then(() => setToggleBehavior(true))
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
		return;
	};
	return (
		<div className='container mt-4'>
			<Toast
				onClose={() => setToggleBehavior(false)}
				isVisible={toggleSnackbar}
				message={snackbar[0]}
				bgColor={snackbar[1]}
			/>
			<h2 className='mb-4'>Danh sách đơn hàng</h2>
			<Table striped bordered hover>
				<thead>
					<tr>
						<th>Mã đơn hàng</th>
						<th>Ngày đặt</th>
						<th>Tên sách</th>
						<th>Số lượng</th>
						<th>Giá sách</th>
						<th>Tổng tiền</th>
						<th>Trạng thái</th>
						<th>Hành động</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<tr key={order.orderId}>
							<td>{order.orderId}</td>
							<td>{new Date(order.orderDate).toLocaleString()}</td>
							<td>{order.book.title}</td>
							<td>{order.quantity}</td>
							<td>{order.book.price.toFixed(2)}đ</td>
							<td>{(order.book.price * order.quantity).toFixed(2)}đ</td>
							<td>{order.status.statusName}</td>
							<td align='center'>
								{order.status.statusId !== 1 ? (
									<Link
										to={`/checkout/${order.book.id}`}
										className='btn btn-primary'
									>
										Xem chi tiết
									</Link>
								) : (
									<button
										className='btn btn-danger'
										onClick={() => onDelete(order.orderId)}
									>
										Xóa
									</button>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	);
};

export default OrderPage;
