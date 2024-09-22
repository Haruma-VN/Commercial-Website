class Book {
    public id: number;
    public title: string;
    public author: string;
    public description: string;
    public copies: number;
    public copiesAvailable: number;
    /**
     * image use base64
     */
    public image: string;

    public constructor(id: number, title: string, author: string, description: string, copies: number, copiesAvailable: number, image: string) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.copies = copies;
        this.copiesAvailable = copiesAvailable;
        this.image = image;
    }
}

export default Book;
