import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import { getCookie } from 'typescript-cookie';
import Statistic from '../../model/Statistic';

const Statistics = () => {
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(new Date());
	const [statistics, setStatistics] = useState<Statistic[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleGenerateStatistics = async () => {
		if (!startDate || !endDate) {
			return;
		}

		setLoading(true);
		setError(null);

		const formattedStartDate = startDate.toISOString();
		const formattedEndDate = endDate.toISOString();

		const fetchStatistic = async () => {
			const response = await fetch(
				`http://localhost:3308/api/v1/statistics/statistics?startTime=${formattedStartDate}&endTime=${formattedEndDate}`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${getCookie('accessToken')}`,
					},
				},
			);

			if (!response.ok) {
				throw new Error('Không thể lấy dữ liệu thống kê từ server.');
			}

			const data: Statistic[] = await response.json();
			setStatistics(data);
		};

		fetchStatistic()
			.catch((e) => setError(e.message || 'Đã có lỗi xảy ra.'))
			.finally(() => setLoading(false));
	};

	const formatDate = (timestamp: number) => {
		const date = new Date(timestamp);
		return date.toLocaleDateString('vi-VN');
	};

	if (loading) {
		return <Spinner />;
	}

	if (error !== null) {
		return <Exception message={error} />;
	}

	return (
		<div className='container'>
			<h2 className='my-4'>Thống kê theo thời gian</h2>
			<div className='d-flex align-items-center mb-3'>
				<div className='me-3 flex-grow-1'>
					<label className='form-label'>Từ ngày</label>
					<DatePicker
						selected={startDate}
						onChange={(date) => setStartDate(date)}
						dateFormat='yyyy-MM-dd'
						className='form-control'
					/>
				</div>

				<div className='me-3 flex-grow-1'>
					<label className='form-label'>Đến ngày</label>
					<DatePicker
						selected={endDate}
						onChange={(date) => setEndDate(date)}
						dateFormat='yyyy-MM-dd'
						className='form-control'
					/>
				</div>

				<div>
					<button onClick={handleGenerateStatistics} className='btn btn-primary mt-4'>
						Xem thống kê
					</button>
				</div>
			</div>

			{statistics.length > 0 && (
				<table className='table table-bordered table-striped mt-4'>
					<thead>
						<tr>
							<th>Ngày</th>
							<th>Tổng tiền</th>
							<th>Số lượng đơn</th>
						</tr>
					</thead>
					<tbody>
						{statistics.map((stat, index) => (
							<tr key={index}>
								<td>{formatDate(stat.date)}</td>
								<td>{stat.totalPrice.toFixed(3)} VND</td>
								<td>{stat.count}</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			{!loading && statistics.length === 0 && !error && (
				<div className='alert alert-warning'>
					Không có dữ liệu thống kê cho khoảng thời gian này.
				</div>
			)}
		</div>
	);
};

export default Statistics;
