import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Navbar.css';
import Category from '../../model/Category';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';

const Navbar = () => {
	const { user, setUser } = useContext(UserContext)!;
	const [isLoading, setLoading] = useState<boolean>(true);
	const [categories, setCategories] = useState<Array<Category>>([]);
	const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();
	const onLogout = () => {
		setUser(null);
		navigate('/');
		window.location.reload();
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch('http://localhost:3308/api/v1/category');
			if (!response.ok) {
				throw new Error('Không thể lấy danh sách danh mục');
			}
			setCategories(await response.json());
		};
		fetchUsers()
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	useEffect(() => {}, []);

	if (isLoading) {
		return <Spinner />;
	}

	if (error !== null) {
		return <Exception message={error} />;
	}
	return (
		<nav className='navbar navbar-expand-lg navbar-dark main-color py-3 shadow-sm'>
			<div className='container-fluid'>
				<Link to='/' className='navbar-brand fw-bold logo'>
					Shop bán sách
				</Link>
				<a
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarNavDropdown'
					aria-controls='navbarNavDropdown'
					aria-expanded='false'
					aria-label='Toggle navigation'
				>
					<span className='navbar-toggler-icon'></span>
				</a>
				<div className='collapse navbar-collapse' id='navbarNavDropdown'>
					<ul className='navbar-nav me-auto'>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/home'>
								Trang chủ
							</NavLink>
						</li>
						<li className='nav-item'>
							<NavLink className='nav-link' to='/search'>
								Tìm kiếm sách
							</NavLink>
						</li>
						<li className='nav-item dropdown'>
							<a
								className='nav-link dropdown-toggle'
								href='#'
								id='navbarDropdown'
								role='button'
								data-bs-toggle='dropdown'
								aria-expanded='false'
							>
								Danh mục
							</a>
							<ul className='dropdown-menu' aria-labelledby='navbarDropdown'>
								{categories.map((e) => (
									<li key={e.id}>
										<NavLink
											className='dropdown-item'
											to={`/category/${e.id}`} // React Router sẽ tự xử lý điều hướng
										>
											{e.name}
										</NavLink>
									</li>
								))}
							</ul>
						</li>
						{user &&
						user.roles.find((e) => e.roleName === 'ROLE_ADMIN') !== undefined ? (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/admin'>
									Admin
								</NavLink>
							</li>
						) : (
							<></>
						)}
						{window.innerWidth <= 900 && (
							<li className='nav-item'>
								<NavLink className='nav-link' to='/cart'>
									Giỏ hàng
								</NavLink>
							</li>
						)}
					</ul>
					<ul className='navbar-nav ms-auto'>
						{user && window.innerWidth > 900 && (
							<>
								<li className='nav-item m-2'>
									<Link to='/cart' className='btn cart-btn'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='16'
											height='16'
											fill='currentColor'
											className='bi bi-cart'
											viewBox='0 0 16 16'
										>
											<path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2' />
										</svg>
									</Link>
								</li>
								<li className='nav-item m-2'>
									<Link to='/order' className='btn cart-btn'>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											height='16'
											viewBox='0 -960 960 960'
											width='16'
											fill='#e8eaed'
										>
											<path d='M160-160v-516L82-846l72-34 94 202h464l94-202 72 34-78 170v516H160Zm240-280h160q17 0 28.5-11.5T600-480q0-17-11.5-28.5T560-520H400q-17 0-28.5 11.5T360-480q0 17 11.5 28.5T400-440ZM240-240h480v-358H240v358Zm0 0v-358 358Z' />
										</svg>
									</Link>
								</li>
							</>
						)}
						<li className='nav-item m-1'>
							{user ? (
								<button
									onClick={onLogout}
									className='btn btn-outline-light logout-btn p-2'
								>
									Đăng xuất
								</button>
							) : (
								<Link
									to='/login'
									className='btn btn-outline-light register-btn p-2'
								>
									Đăng nhập
								</Link>
							)}
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
