class OrderStatus {
	public statusName: string;
	public orderCount: number;
	public constructor(statusName: string, orderCount: number) {
		this.orderCount = orderCount;
		this.statusName = statusName;
	}
}

export default OrderStatus;
