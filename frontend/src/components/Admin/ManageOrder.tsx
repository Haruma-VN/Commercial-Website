import './ManageOrder.css';
import OrderPending from './Order/OrderPending';
import OrderApprove from './Order/OrderApprove';
import OrderCancelled from './Order/OrderCancelled';
// Tab : https://getbootstrap.com/docs/5.0/components/navs-tabs/
const ManageOrder = () => {
	return (
		<>
			<ul
				className='nav nav-pills mb-3 justify-content-around w-100'
				id='pills-tab'
				role='tablist'
			>
				<li className='nav-item flex-fill' role='presentation'>
					<button
						className='nav-link active text-center my-tab'
						id='pills-home-tab'
						data-bs-toggle='pill'
						data-bs-target='#pills-home'
						type='button'
						role='tab'
						aria-controls='pills-home'
						aria-selected='true'
					>
						Chưa duyệt
					</button>
				</li>
				<li className='nav-item flex-fill' role='presentation'>
					<button
						className='nav-link text-center my-tab'
						id='pills-profile-tab'
						data-bs-toggle='pill'
						data-bs-target='#pills-profile'
						type='button'
						role='tab'
						aria-controls='pills-profile'
						aria-selected='false'
					>
						Đã duyệt
					</button>
				</li>
				<li className='nav-item flex-fill' role='presentation'>
					<button
						className='nav-link text-center my-tab'
						id='pills-contact-tab'
						data-bs-toggle='pill'
						data-bs-target='#pills-contact'
						type='button'
						role='tab'
						aria-controls='pills-contact'
						aria-selected='false'
					>
						Đã hủy
					</button>
				</li>
			</ul>
			<div className='tab-content' id='pills-tabContent'>
				<div
					className='tab-pane fade show active'
					id='pills-home'
					role='tabpanel'
					aria-labelledby='pills-home-tab'
				>
					<OrderPending />
				</div>
				<div
					className='tab-pane fade'
					id='pills-profile'
					role='tabpanel'
					aria-labelledby='pills-profile-tab'
				>
					<OrderApprove />
				</div>
				<div
					className='tab-pane fade'
					id='pills-contact'
					role='tabpanel'
					aria-labelledby='pills-contact-tab'
				>
					<OrderCancelled />
				</div>
			</div>
		</>
	);
};

export default ManageOrder;
