import Role from './Role';
import UserDetail from './UserDetail';

class User {
	public id: number;
	public email: string;
	public password: string;
	public userDetail: UserDetail;
	public roles: Array<Role>;

	public constructor(
		id: number,
		email: string,
		password: string,
		userDetail: UserDetail,
		roles: Array<Role>,
	) {
		this.id = id;
		this.email = email;
		this.password = password;
		this.userDetail = userDetail;
		this.roles = roles;
	}
}

export default User;
