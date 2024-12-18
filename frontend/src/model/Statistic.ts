class Statistic {
	public date: number;
	public totalPrice: number;
	public count: number;

	public constructor(date: number, totalPrice: number, count: number) {
		this.date = date;
		this.totalPrice = totalPrice;
		this.count = count;
	}
}

export default Statistic;
