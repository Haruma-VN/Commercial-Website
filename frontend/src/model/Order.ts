import Address from './Address';
import Book from './Book';
import Status from './Status';

class Order {
	public orderId: number;
	public orderDate: number;
	public totalPrice: number;
	public quantity: number;
	public status: Status;
	public address: Address;
	public book: Book;
	public constructor(
		orderId: number,
		orderDate: number,
		totalPrice: number,
		quantity: number,
		status: Status,
		address: Address,
		book: Book,
	) {
		this.orderId = orderId;
		this.orderDate = orderDate;
		this.address = address;
		this.totalPrice = totalPrice;
		this.status = status;
		this.book = book;
		this.quantity = quantity;
	}
}

export default Order;
