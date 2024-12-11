import { useEffect, useState } from 'react';
import Category from '../../model/Category';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import Modal from 'react-modal';
import Toast from '../Toast/Toast';
import { changeCategoryStyle, deleteDataStyle } from './ModalConfiguration';
import ExcelExport from './ExcelExport';
import './Manage.css';
import { getCookie } from 'typescript-cookie';

const ManageCategory = () => {
	const [categories, setCategories] = useState<Array<Category>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<[string, 'danger' | 'info' | 'success']>(['', 'info']);
	const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
	const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
	const [style, setStyle] = useState<Modal.Styles | undefined>();

	const showToast = () => {
		setToggleBehavior(true);
		setTimeout(() => {
			setToggleBehavior(false);
		}, 3000);
	};

	useEffect(() => {
		const fetchCategories = async () => {
			const response = await fetch('http://localhost:3308/api/v1/category');
			if (!response.ok) {
				throw new Error('Không thể lấy danh mục');
			}
			setCategories(await response.json());
		};
		fetchCategories()
			.catch((e) => setError(e.message))
			.finally(() => setLoading(false));
	}, []);

	const addCategory = async (category: Category) => {
		setLoading(true);
		const fetchCategories = async () => {
			const response = await fetch('http://localhost:3308/api/v1/category', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				body: JSON.stringify(category),
			});
			if (!response.ok) {
				throw new Error('Không thể thêm danh mục');
			}
			setCategories([...categories, (await response.json()) as Category]);
		};
		fetchCategories()
			.catch((e) => setError(e.message))
			.finally(() => {
				setSnackbar(['Danh mục mới được thêm hoàn tất', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentCategory(null);
			});
	};

	const updateCategory = async (category: Category) => {
		setLoading(true);
		const fetchCategories = async () => {
			const response = await fetch('http://localhost:3308/api/v1/category', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				body: JSON.stringify(category),
			});
			if (!response.ok) {
				throw new Error('Không thể sửa danh mục');
			}
		};
		fetchCategories()
			.catch((e) => setError(e.message))
			.finally(() => {
				setCategories(categories.map((c) => (c.id === category.id ? category : c)));
				setSnackbar(['Đã sửa thành công danh mục', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentCategory(null);
			});
	};

	const deleteCategory = async (category: Category) => {
		setLoading(true);
		const fetchCategories = async () => {
			const response = await fetch(`http://localhost:3308/api/v1/category/${category.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			});
			if (!response.ok) {
				throw new Error('Không thể xoá danh mục');
			}
		};
		fetchCategories()
			.catch((e) => setError(e.message))
			.finally(() => {
				setCategories(categories.filter((c) => c.id !== category.id));
				setSnackbar(['Danh mục xoá thành công', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentCategory(null);
			});
	};

	const onChange = (category: Category | null) => {
		setCurrentCategory(category);
		setStyle(changeCategoryStyle);
		setOpenDialog(true);
	};

	const onDelete = (category: Category) => {
		setCurrentCategory(category);
		setStyle(deleteDataStyle);
		setOpenDialog(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCurrentCategory({
			...currentCategory!,
			[e.target.name]: e.target.value,
		});
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
				<h2>Quản lý Danh mục</h2>
				<div>
					<button
						className='btn btn-secondary my-custom-button me-2'
						onClick={() => onChange({ name: '' } as Category)}
					>
						Thêm
					</button>
					<ExcelExport fileName='category' jsonData={categories} sheetName='Danh mục' />
				</div>
			</div>
			<table className='table my-custom-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Tên</th>
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
						{style === changeCategoryStyle ? (
							<form>
								<div className='mb-3'>
									<label className='form-label'>Tên danh mục</label>
									<input
										type='text'
										className='form-control'
										name='name'
										onChange={handleInputChange}
										value={currentCategory?.name}
									/>
								</div>
								<button
									onClick={() =>
										currentCategory?.id
											? updateCategory(currentCategory!)
											: addCategory(currentCategory!)
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
								<h5 className='text-danger mb-4'>{`Bạn có chắc chắn muốn xoá danh mục ${currentCategory?.name}?`}</h5>
								<div>
									<button
										onClick={() => deleteCategory(currentCategory!)}
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
					{categories.map((category) => (
						<tr key={category.id}>
							<td>{category.id}</td>
							<td>{category.name}</td>
							<td>
								<button
									className='btn btn-primary my-custom-button me-2'
									onClick={() => onChange(category)}
								>
									Sửa
								</button>
								<button
									className='btn btn-danger my-custom-button'
									onClick={() => onDelete(category)}
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

export default ManageCategory;
