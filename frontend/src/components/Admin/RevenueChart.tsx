import React from 'react';
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts';
import Revenue from '../../model/Revenue';
import './Tooltip.css';

const RevenueChart: React.FC<{ data: Array<Revenue> }> = ({ data }) => {
	const formattedData = data.map((item) => ({
		...item,
		date: new Date(item.date).toLocaleDateString(),
	}));

	const renderTooltip = (props: any) => {
		const { payload, label } = props;
		if (payload && payload.length) {
			const totalPrice = payload[0].value;
			return (
				<div
					className='custom-tooltip'
					style={{ background: '#fff', border: '1px solid #ccc', padding: '10px' }}
				>
					<p>
						<strong>Ngày:</strong> {label}
					</p>
					<p>
						<strong>Số tiền:</strong> {totalPrice.toFixed(3)} VND
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div>
			<h6>Doanh thu theo ngày</h6>
			<ResponsiveContainer width='100%' height={300}>
				<LineChart data={formattedData}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='date' />
					<YAxis />
					<Tooltip content={renderTooltip} />
					<Legend />
					<Line type='monotone' dataKey='totalPrice' stroke='#8884d8' />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default RevenueChart;
