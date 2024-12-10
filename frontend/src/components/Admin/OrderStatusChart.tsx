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
import OrderStatus from '../../model/OrderStatus';
import './Tooltip.css';

const OrderStatusChart: React.FC<{ data: Array<OrderStatus> }> = ({ data }) => {
	const renderTooltip = (props: any) => {
		const { payload, label } = props;
		if (payload && payload.length) {
			const count = payload[0].value;
			return (
				<div
					className='custom-tooltip'
					style={{ background: '#fff', border: '1px solid #ccc', padding: '10px' }}
				>
					<p>
						<strong>Trạng thái:</strong> {label}
					</p>
					<p>
						<strong>Số lượng:</strong> {count}
					</p>
				</div>
			);
		}
		return null;
	};

	return (
		<div>
			<h6>Trạng thái đơn hàng</h6>
			<ResponsiveContainer width='100%' height={300}>
				<LineChart data={data}>
					<CartesianGrid strokeDasharray='3 3' />
					<XAxis dataKey='statusName' />
					<YAxis />
					<Tooltip content={renderTooltip} />
					<Legend />
					<Line type='monotone' dataKey='orderCount' stroke='#82ca9d' />
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
};

export default OrderStatusChart;
