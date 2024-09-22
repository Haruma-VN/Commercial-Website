class Review {
    public id: number;
    public userEmail: string;
    public username: string;
    public date: string;
    public rating: number;
    public description: string;

    public constructor(id: number, userEmail: string, username: string, date: string, rating: number, description: string) {
        this.id = id;
        this.userEmail = userEmail;
        this.username = username;
        this.date = date;
        this.rating = rating;
        this.description = description;
    }
}

export default Review;
