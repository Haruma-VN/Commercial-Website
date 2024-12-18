class Book {
	public id: number;
	public title: string;
	public author: string;
	public description: string;
	public price: number;
	public quantity: number;
	public categoryId: number;
	/**
	 * image use base64
	 */
	public image: string;

	public constructor(
		id: number,
		title: string,
		author: string,
		description: string,
		quantity: number,
		price: number,
		image: string,
		categoryId: number,
	) {
		this.id = id;
		this.title = title;
		this.author = author;
		this.description = description;
		this.quantity = quantity;
		this.price = price;
		this.image = image;
		this.categoryId = categoryId;
	}
}

export default Book;
