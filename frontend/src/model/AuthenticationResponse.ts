import User from './User';

class AuthenticationResponse {
	public user: User;
	public accessToken: string;
	public constructor(user: User, accessToken: string) {
		this.user = user;
		this.accessToken = accessToken;
	}
}

export default AuthenticationResponse;
