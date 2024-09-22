import UserDetail from "./UserDetail";

class User {
    public id: number;
    public email: string;
    public password: string;
    public userDetail: UserDetail;

    public constructor(id: number, email: string, password: string, userDetail: UserDetail) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.userDetail = userDetail;
    }
}

export default User;
