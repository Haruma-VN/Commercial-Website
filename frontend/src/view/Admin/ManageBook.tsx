import { useEffect, useState } from "react";
import Book from "../../model/Book";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";
import Modal from "react-modal";
import Toast from "../Toast/Toast";
import { changeDataStyle, deleteDataStyle } from "./ModalConfiguration";

const ManageBook = () => {
    const [books, setBooks] = useState<Array<Book>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<[string, "danger" | "info" | "success"]>(["", "info"]);
    const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [element, setElement] = useState<JSX.Element>(<></>);
    const [style, setStyle] = useState<Modal.Styles | undefined>();

    const base64Convert = (data: Uint8Array) => {
        let binaryString: string = "";
        for (let i = 0; i < data.byteLength; ++i) {
            binaryString += String.fromCharCode(data[i]);
        }
        return btoa(binaryString);
    };

    const showToast = () => {
        setToggleBehavior(true);
        setTimeout(() => {
            setToggleBehavior(false);
        }, 3000);
    };

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:3308/api/v1/book");
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu sách");
            }
            setBooks(await response.json());
        };
        fetchBooks()
            .catch((e) => setError(e.message))
            .finally(() => setLoading(false));
    }, []);

    const addBook = async (book: Book) => {
        setLoading(true);
        if (selectedImage) {
            book.image = base64Convert(new Uint8Array(await selectedImage.arrayBuffer()));
        }
        const response = await fetch("http://localhost:3308/api/v1/book", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi thêm sách");
        }
        setSnackbar(["Thêm sách hoàn tất", "success"]);
        setLoading(false);
        showToast();
        setOpenDialog(false);
        setCurrentBook(null);
        setSelectedImage(null);
    };

    const updateBook = async (book: Book) => {
        setLoading(true);
        if (selectedImage) {
            book.image = base64Convert(new Uint8Array(await selectedImage.arrayBuffer()));
        }
        const response = await fetch("http://localhost:3308/api/v1/book", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
        });
        if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi cập nhật sách");
        }
        setSnackbar(["Sửa sách hoàn tất", "success"]);
        setLoading(false);
        showToast();
        setOpenDialog(false);
        setCurrentBook(null);
        setSelectedImage(null);
    };

    const deleteBook = async (book: Book) => {
        setLoading(true);
        const response = await fetch(`http://localhost:3308/api/v1/book/${book.id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Có lỗi xảy ra khi xoá sách");
        }
        setSnackbar(["Xoá sách hoàn tất", "success"]);
        setLoading(false);
        showToast();
        setOpenDialog(false);
        setCurrentBook(null);
        setSelectedImage(null);
    };

    const onChange = (book: Book | null) => {
        setCurrentBook(book);
        setStyle(changeDataStyle);
        setElement(
            <form>
                <div className="mb-3">
                    <label className="form-label">Tiêu đề</label>
                    <input type="text" className="form-control" name="title" onChange={handleInputChange} value={currentBook!.title} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Tác giả</label>
                    <input type="text" className="form-control" name="author" onChange={handleInputChange} value={currentBook!.author} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mô tả</label>
                    <textarea className="form-control" name="description" onChange={handleInputChange} rows={10} value={currentBook!.description}></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Tổng số lượng</label>
                    <input type="number" className="form-control" name="copies" onChange={handleInputChange} value={currentBook!.copies} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Còn lại</label>
                    <input type="number" className="form-control" name="copiesAvailable" onChange={handleInputChange} value={currentBook!.copiesAvailable} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Ảnh</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                    {currentBook!.image && !selectedImage && <img src={`${currentBook!.image}`} alt="Book Cover" style={{ marginTop: 10, maxWidth: 200 }} />}
                </div>
                <button onClick={() => (currentBook!.id ? updateBook(currentBook!) : addBook(currentBook!))} type="button" className="btn btn-primary">
                    Lưu
                </button>
                <button type="button" className="btn btn-secondary" style={{ marginLeft: 4 }} onClick={() => setOpenDialog(false)}>
                    Đóng
                </button>
            </form>
        );
        setOpenDialog(true);
    };

    const onDelete = (book: Book) => {
        setCurrentBook(book);
        setStyle(deleteDataStyle);
        setElement(
            <div className="text-center p-4">
                <h5 className="text-danger mb-4">{`Bạn có chắc chắn muốn xoá sách "${book.title}"?`}</h5>
                <div>
                    <button onClick={() => deleteBook(book)} type="button" className="btn btn-danger me-3 px-4" style={{ fontWeight: "bold" }}>
                        Xoá
                    </button>
                    <button onClick={() => setOpenDialog(false)} className="btn btn-secondary px-4">
                        Đóng
                    </button>
                </div>
            </div>
        );
        setOpenDialog(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (currentBook) {
            setCurrentBook({
                ...currentBook,
                [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
            });
        }
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

    return (
        <div className="container">
            <Toast onClose={() => setToggleBehavior(false)} isVisible={toggleSnackbar} message={snackbar[0]} bgColor={snackbar[1]} />
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2>Quản lý sách</h2>
                <div>
                    <button className="btn btn-success me-2" onClick={() => onChange({} as Book)}>
                        Thêm
                    </button>
                    <button className="btn btn-secondary">Xuất Excel</button>
                </div>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Mô tả</th>
                        <th>Tổng</th>
                        <th>Còn</th>
                        <th>Ảnh</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Modal isOpen={openDialog} onRequestClose={() => setOpenDialog(false)} style={style}>
                        {element}
                    </Modal>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>{book.copies}</td>
                            <td>{book.copiesAvailable}</td>
                            <td>
                                <button className="btn btn-primary me-2 mt-1" onClick={() => onChange(book)}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger mt-3" onClick={() => onDelete(book)}>
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

export default ManageBook;
