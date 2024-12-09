import { useEffect, useState } from 'react';
import User from '../../model/User';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import Modal from 'react-modal';
import Toast from '../Toast/Toast';
import { changeDataStyle, deleteDataStyle } from './ModalConfiguration';
import ExcelExport from './ExcelExport';
import './Manage.css';

const ManageUser = () => {
	const [users, setUsers] = useState<Array<User>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<[string, 'danger' | 'info' | 'success']>(['', 'info']);
	const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
	const [currentUser, setCurrentUser] = useState<User | null>(null);
	const [style, setStyle] = useState<Modal.Styles | undefined>();
	const [password, setPassword] = useState<string>('');

	const showToast = () => {
		setToggleBehavior(true);
		setTimeout(() => {
			setToggleBehavior(false);
		}, 3000);
	};

	useEffect(() => {
		const fetchUsers = async () => {
			const response = await fetch('http://localhost:3308/api/v1/user');
			if (!response.ok) {
				throw new Error('Không thể lấy danh sách người dùng');
			}
			setUsers(await response.json());
		};
		fetchUsers()
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	const addUser = async (user: User) => {
		setLoading(true);
		const fetchUsers = async () => {
			const response = await fetch('http://localhost:3308/api/v1/user/register', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...user, password } as User),
			});
			if (!response.ok) {
				throw new Error('Không thể thêm người dùng');
			}
			setUsers([...users, (await response.json()) as User]);
		};
		fetchUsers()
			.catch((e) => setError(e.message))
			.finally(() => {
				setSnackbar(['Người dùng mới được thêm hoàn tất', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentUser(null);
				setPassword('');
			});
	};

	const updateUser = async (user: User) => {
		setLoading(true);
		const fetchUsers = async () => {
			const response = await fetch('http://localhost:3308/api/v1/user', {
				method: 'PUT',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ ...user, password: password || user.password }),
			});
			if (!response.ok) {
				throw new Error('Không thể sửa người dùng');
			}
		};
		fetchUsers()
			.catch((e) => setError(e.message))
			.finally(() => {
				setUsers(users.map((u) => (u.id === user.id ? user : u)));
				setSnackbar(['Đã sửa thành công người dùng', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentUser(null);
				setPassword('');
			});
	};

	const deleteUser = async (user: User) => {
		setLoading(true);
		const fetchUsers = async () => {
			const response = await fetch(`http://localhost:3308/api/v1/user/${user.id}`, {
				method: 'DELETE',
			});
			if (!response.ok) {
				throw new Error('Không thể xoá người dùng');
			}
		};
		fetchUsers()
			.catch((e) => setError(e.message))
			.finally(() => {
				setUsers(users.filter((u) => u.id !== user.id));
				setSnackbar(['Người dùng xoá thành công', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentUser(null);
			});
	};

	const onChange = (user: User | null) => {
		setCurrentUser(user);
		setStyle(changeDataStyle);
		setOpenDialog(true);
	};

	const onDelete = (user: User) => {
		setCurrentUser(user);
		setStyle(deleteDataStyle);
		setOpenDialog(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target;

		if (name === 'password') {
			setPassword(value);
		} else if (name === 'role') {
			setCurrentUser((prevUser) => ({
				...prevUser!,
				userDetail: {
					...prevUser!.userDetail,
					role: value,
				},
			}));
		} else if (name === 'name') {
			setCurrentUser((prevUser) => ({
				...prevUser!,
				userDetail: {
					...prevUser!.userDetail,
					name: value,
				},
			}));
		} else {
			setCurrentUser((prevUser) => ({
				...prevUser!,
				[name]: value,
			}));
		}
	};

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Exception message={error} />;
	}

	return (
		<div className='container'>
			<Toast
				onClose={() => setToggleBehavior(false)}
				isVisible={toggleSnackbar}
				message={snackbar[0]}
				bgColor={snackbar[1]}
			/>
			<div className='d-flex justify-content-between align-items-center my-4'>
				<h2>Quản lý Người dùng</h2>
				<div>
					<button
						className='btn btn-secondary my-custom-button me-2'
						onClick={() => {
							setPassword('');
							onChange({ email: '', userDetail: { name: '' } } as User);
						}}
					>
						Thêm
					</button>
					<ExcelExport fileName='user' jsonData={users} sheetName='Người dùng' />
				</div>
			</div>
			<table className='table my-custom-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Email</th>
						<th>Tên</th>
						<th>Vai trò</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<Modal
						ariaHideApp={false}
						isOpen={openDialog}
						onRequestClose={() => setOpenDialog(false)}
						style={style}
					>
						{style === changeDataStyle ? (
							<form>
								<div className='mb-3'>
									<label className='form-label'>Email</label>
									<input
										type='email'
										className='form-control'
										name='email'
										onChange={handleInputChange}
										value={currentUser?.email}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Tên</label>
									<input
										type='text'
										className='form-control'
										name='name'
										onChange={handleInputChange}
										value={currentUser?.userDetail.name}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Mật khẩu</label>
									<input
										type='password'
										className='form-control'
										name='password'
										onChange={handleInputChange}
										value={password}
										placeholder='Đặt mật khẩu'
									/>
								</div>
								<button
									onClick={() =>
										currentUser?.id
											? updateUser(currentUser!)
											: addUser(currentUser!)
									}
									type='button'
									className='btn btn-primary my-custom-button'
								>
									Lưu
								</button>
								<button
									type='button'
									className='btn btn-secondary my-custom-button'
									style={{ marginLeft: 4 }}
									onClick={() => setOpenDialog(false)}
								>
									Đóng
								</button>
							</form>
						) : style === deleteDataStyle ? (
							<div className='text-center p-4'>
								<h5 className='text-danger mb-4'>{`Bạn có chắc chắn muốn xoá người dùng ${currentUser?.userDetail.name}?`}</h5>
								<div>
									<button
										onClick={() => deleteUser(currentUser!)}
										type='button'
										className='btn btn-danger my-custom-button me-3 px-4'
										style={{ fontWeight: 'bold' }}
									>
										Xoá
									</button>
									<button
										onClick={() => setOpenDialog(false)}
										className='btn btn-secondary my-custom-button px-4'
									>
										Đóng
									</button>
								</div>
							</div>
						) : null}
					</Modal>
					{users.map((user) => (
						<tr key={user.id}>
							<td>{user.id}</td>
							<td>{user.email}</td>
							<td>{user.userDetail.name}</td>
							<td>
								<button
									className='btn btn-primary my-custom-button me-2'
									onClick={() => {
										setPassword('');
										onChange(user);
									}}
								>
									Sửa
								</button>
								<button
									className='btn btn-danger my-custom-button'
									onClick={() => onDelete(user)}
								>
									Xoá
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ManageUser;
