import { useContext, useState } from 'react';
import User from '../../model/User';
import { UserContext } from '../../context/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const LoginPage = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const { setUser } = useContext(UserContext)!;
	let destination: string = '/home';
	const navigate = useNavigate();
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		setIsLoading(true);
		e.preventDefault();
		const loginUrl: string = `http://localhost:3308/api/v1/user/login`;
		const login = async () => {
			const response = await fetch(loginUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});
			if (!(response.status == 200)) {
				throw new Error('Có lỗi xảy ra trong quá trình xử lý gửi request đến server');
			}
			const user = (await response.json()) as User;
			setUser(user);
			if (user.roles.find((e) => e.roleName === 'ROLE_ADMIN') !== undefined) {
				destination = '/admin';
			}
			navigate(destination);
		};
		login()
			.catch((e) => setError(e.message))
			.finally(() => {
				setTimeout(() => {
					setIsLoading(false);
				}, 500);
			});
	};

	if (isLoading) {
		return <Spinner />;
	}

	return (
		<div className='container mt-5 '>
			<div className='row justify-content-center'>
				<div className='col-md-4'>
					<div className='card shadow-lg' style={{ borderRadius: '15px' }}>
						<div className='card-body'>
							<h2 className='text-center mb-4'>Đăng nhập tài khoản</h2>
							{error && <div className='alert alert-danger'>{error}</div>}
							{isLoading && (
								<div className='alert alert-success'>Đăng nhập thành công!</div>
							)}
							<form onSubmit={handleSubmit}>
								<div className='mb-3'>
									<label htmlFor='email' className='form-label'>
										Địa chỉ email
									</label>
									<input
										type='email'
										className='form-control'
										id='email'
										name='email'
										value={email}
										onChange={(e) => setEmail(e.target.value)}
										required
									/>
								</div>

								<div className='mb-3'>
									<label htmlFor='password' className='form-label'>
										Mật khẩu
									</label>
									<input
										type='password'
										className='form-control'
										id='password'
										name='password'
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										required
									/>
								</div>
								<div className='text-end mb-3'>
									<Link
										to='/register'
										className='text-muted'
										style={{ fontStyle: 'italic' }}
									>
										Đăng ký
									</Link>
								</div>
								<button type='submit' className='btn btn-primary w-100 shadow'>
									Đăng nhập
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
