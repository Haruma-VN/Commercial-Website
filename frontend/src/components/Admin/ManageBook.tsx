import { useEffect, useState } from 'react';
import Book from '../../model/Book';
import Spinner from '../Spinner/Spinner';
import Exception from '../Exception/Exception';
import Modal from 'react-modal';
import Toast from '../Toast/Toast';
import { changeDataStyle, deleteDataStyle } from './ModalConfiguration';
import { encodeFileToBase64 } from '../../utility/Encoder';
import ExcelExport from './ExcelExport';
import './Manage.css';
import { getCookie } from 'typescript-cookie';
import Category from '../../model/Category';

const ManageBook = () => {
	const [books, setBooks] = useState<Array<Book>>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [openDialog, setOpenDialog] = useState<boolean>(false);
	const [snackbar, setSnackbar] = useState<[string, 'danger' | 'info' | 'success']>(['', 'info']);
	const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
	const [currentBook, setCurrentBook] = useState<Book | null>(null);
	const [selectedImage, setSelectedImage] = useState<File | null>(null);
	const [style, setStyle] = useState<Modal.Styles | undefined>();
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [booksPerPage] = useState<number>(5);
	const [totalBooks, setTotalBooks] = useState<number>(0);
	const [categories, setCategories] = useState<Array<Category>>([]);

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

	useEffect(() => {
		const fetchBooks = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`http://localhost:3308/api/v1/book?page=${currentPage}&limit=${booksPerPage}`,
				);
				if (!response.ok) {
					throw new Error('Không thể lấy dữ liệu sách');
				}
				const data = await response.json();
				setBooks(data.content);
				setTotalBooks(data.totalElements);
			} catch (e) {
				setError((e as any).message);
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();
	}, [currentPage, booksPerPage]);

	const addBook = async (book: Book) => {
		setLoading(true);
		if (!selectedImage) {
			throw new Error('Không có hình ảnh hợp lệ');
		}
		const data = await encodeFileToBase64(selectedImage);
		book.image = data as string;
		const fetchBooks = async () => {
			const response = await fetch('http://localhost:3308/api/v1/book', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				body: JSON.stringify(book),
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra khi thêm sách');
			}
			setBooks([...books, (await response.json()) as Book]);
		};
		fetchBooks()
			.catch((e) => setError(e.message))
			.finally(() => {
				setSnackbar(['Thêm sách hoàn tất', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentBook(null);
				setSelectedImage(null);
			});
	};

	const updateBook = async (book: Book) => {
		setLoading(true);
		if (selectedImage !== null) {
			book.image = (await encodeFileToBase64(selectedImage)) as string;
		}
		const fetchBooks = async () => {
			const response = await fetch('http://localhost:3308/api/v1/book', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
				body: JSON.stringify(book),
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra khi cập nhật sách');
			}
			const updatedBook = await response.json();
			setBooks((prevBooks) =>
				prevBooks.map((b) => (b.id === updatedBook.id ? updatedBook : b)),
			);
		};
		fetchBooks()
			.catch((e) => setError(e.message))
			.finally(() => {
				setSnackbar(['Sửa sách hoàn tất', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentBook(null);
				setSelectedImage(null);
			});
	};

	const deleteBook = async (book: Book) => {
		setLoading(true);
		const fetchBooks = async () => {
			const response = await fetch(`http://localhost:3308/api/v1/book/${book.id}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getCookie('accessToken')}`,
				},
			});
			if (!response.ok) {
				throw new Error('Có lỗi xảy ra khi xoá sách');
			}
		};
		fetchBooks()
			.catch((e) => setError(e))
			.finally(() => {
				setSnackbar(['Xoá sách hoàn tất', 'success']);
				setLoading(false);
				showToast();
				setOpenDialog(false);
				setCurrentBook(null);
				setSelectedImage(null);
				setBooks(books.filter((e) => e.id !== book.id));
			});
	};

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setCurrentBook({
			...currentBook!,
			categoryId: Number(e.target.value),
		});
	};

	const onChange = (book: Book | null) => {
		setCurrentBook(book);
		setStyle(changeDataStyle);
		setOpenDialog(true);
	};

	const onDelete = (book: Book) => {
		setCurrentBook(book);
		setStyle(deleteDataStyle);
		setOpenDialog(true);
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setCurrentBook({
			...currentBook!,
			[e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value,
		});
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files.length > 0) {
			setSelectedImage(e.target.files[0]);
		}
	};

	if (loading) {
		return <Spinner />;
	}

	if (error) {
		return <Exception message={error} />;
	}

	const totalPages = Math.ceil(totalBooks / booksPerPage);

	return (
		<div className='container'>
			<Toast
				onClose={() => setToggleBehavior(false)}
				isVisible={toggleSnackbar}
				message={snackbar[0]}
				bgColor={snackbar[1]}
			/>
			<div className='d-flex justify-content-between align-items-center my-4'>
				<h2 className='my-custom-heading'>Quản lý sách</h2>
				<div>
					<button
						className='btn btn-secondary my-custom-button me-2'
						onClick={() =>
							onChange({
								author: '',
								quantity: 0,
								price: 0,
								description: '',
								title: '',
							} as Book)
						}
					>
						Thêm
					</button>
					<ExcelExport
						fileName='book'
						jsonData={books.map((e) => ({ ...e, image: 'Thông tin quá lớn để xuất' }))}
						sheetName='Sách'
					/>
				</div>
			</div>
			<table className='table my-custom-table'>
				<thead>
					<tr>
						<th>ID</th>
						<th>Tiêu đề</th>
						<th>Tác giả</th>
						<th>Mô tả</th>
						<th>Số lượng</th>
						<th>Giá tiền</th>
						<th></th>
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
									<label className='form-label'>Tiêu đề</label>
									<input
										type='text'
										className='form-control'
										name='title'
										onChange={handleInputChange}
										value={currentBook?.title}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Tác giả</label>
									<input
										type='text'
										className='form-control'
										name='author'
										onChange={handleInputChange}
										value={currentBook?.author}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Danh mục</label>
									<select
										className='form-control'
										value={currentBook?.categoryId || ''}
										onChange={handleCategoryChange}
									>
										<option value='' disabled>
											Chọn danh mục
										</option>
										{categories.map((category) => (
											<option key={category.id} value={category.id}>
												{category.name}
											</option>
										))}
									</select>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Số lượng</label>
									<input
										type='number'
										className='form-control'
										name='quantity'
										onChange={handleInputChange}
										value={currentBook?.quantity}
										min={0}
										step={1}
									/>
								</div>
								<div className='mb-3'>
									<label className='form-label'>Giá tiền</label>
									<input
										type='number'
										className='form-control'
										name='price'
										onChange={handleInputChange}
										value={currentBook?.price}
										min={0}
										step={0.01}
									/>
								</div>

								<div className='mb-3'>
									<label className='form-label'>Mô tả</label>
									<textarea
										className='form-control'
										name='description'
										onChange={handleInputChange}
										rows={10}
										value={currentBook?.description}
									/>
								</div>
								<img src={currentBook?.image} />
								<div className='mb-3'>
									<label className='form-label'>Hình ảnh</label>
									<input
										type='file'
										className='form-control'
										accept='image/*'
										onChange={handleImageChange}
									/>
								</div>
								<div className='mb-3'>
									<button
										className='btn btn-primary me-3'
										type='button'
										onClick={() =>
											currentBook?.id
												? updateBook(currentBook)
												: addBook(currentBook!)
										}
									>
										Lưu
									</button>
									<button
										className='btn btn-secondary'
										type='button'
										onClick={() => setOpenDialog(false)}
									>
										Đóng
									</button>
								</div>
							</form>
						) : style === deleteDataStyle ? (
							<div>
								<h3>Bạn có chắc chắn muốn xoá sách này?</h3>
								<div className='d-flex'>
									<button
										className='btn btn-danger me-3'
										onClick={() => deleteBook(currentBook!)}
									>
										Xoá
									</button>
									<button
										className='btn btn-secondary'
										onClick={() => setOpenDialog(false)}
									>
										Hủy
									</button>
								</div>
							</div>
						) : null}
					</Modal>
					{books.map((book) => (
						<tr key={book.id}>
							<td>{book.id}</td>
							<td>{book.title}</td>
							<td>{book.author}</td>
							<td>{book.description}</td>
							<td>{book.quantity}</td>
							<td>{book.price.toFixed(3)} VND</td>
							<td>
								<button className='btn btn-info' onClick={() => onChange(book)}>
									Sửa
								</button>
							</td>
							<td>
								<button className='btn btn-danger' onClick={() => onDelete(book)}>
									Xoá
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className='pagination'>
				<button
					className='btn btn-primary'
					onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 0)}
					disabled={currentPage === 0}
				>
					Quay lại
				</button>
				<span className='mt-2 mb-2' style={{ marginLeft: 10, marginRight: 10 }}>{`Trang ${
					currentPage + 1
				} trên ${totalPages}`}</span>
				<button
					className='btn btn-primary'
					onClick={() =>
						setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)
					}
					disabled={currentPage + 1 === totalPages}
				>
					Trang kế
				</button>
			</div>
		</div>
	);
};

export default ManageBook;
