class Review {
    public id: number;
    public date: string;
    public rating: number;
    public description: string;

    public constructor(id: number, date: string, rating: number, description: string) {
        this.id = id;
        this.date = date;
        this.rating = rating;
        this.description = description;
    }
}

export default Review;
