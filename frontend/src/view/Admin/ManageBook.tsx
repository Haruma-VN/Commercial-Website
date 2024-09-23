import { useEffect, useState } from "react";
import Book from "../../model/Book";
import Spinner from "../Spinner/Spinner";
import Exception from "../Exception/Exception";
import Modal from "react-modal";
import Toast from "../Toast/Toast";
import { changeDataStyle, deleteDataStyle } from "./ModalConfiguration";
import { encodeFileToBase64 } from "../../utility/Encoder";
import ExcelExport from "./ExcelExport";
import "./Manage.css";

const ManageBook = () => {
    const [books, setBooks] = useState<Array<Book>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [snackbar, setSnackbar] = useState<[string, "danger" | "info" | "success"]>(["", "info"]);
    const [toggleSnackbar, setToggleBehavior] = useState<boolean>(false);
    const [currentBook, setCurrentBook] = useState<Book | null>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [style, setStyle] = useState<Modal.Styles | undefined>();

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
        if (!selectedImage) {
            throw new Error("Không có hình ảnh hợp lệ");
        }
        const data = await encodeFileToBase64(selectedImage);
        book.image = data as string;
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:3308/api/v1/book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi thêm sách");
            }
            setBooks([...books, (await response.json()) as Book]);
        };
        fetchBooks()
            .catch((e) => setError(e.message))
            .finally(() => {
                setSnackbar(["Thêm sách hoàn tất", "success"]);
                setLoading(false);
                showToast();
                setOpenDialog(false);
                setCurrentBook(null);
                setSelectedImage(null);
            });
    };

    const updateBook = async (book: Book) => {
        setLoading(true);
        if (!selectedImage) {
            throw new Error("Không có hình ảnh hợp lệ");
        }
        book.image = (await encodeFileToBase64(selectedImage)) as string;
        const fetchBooks = async () => {
            const response = await fetch("http://localhost:3308/api/v1/book", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(book),
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi cập nhật sách");
            }
        };
        fetchBooks()
            .catch((e) => setError(e.message))
            .finally(() => {
                setBooks([...books.filter((e) => e.id === currentBook!.id), currentBook!]);
                setSnackbar(["Sửa sách hoàn tất", "success"]);
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
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi xoá sách");
            }
        };
        fetchBooks()
            .catch((e) => setError(e))
            .finally(() => {
                setSnackbar(["Xoá sách hoàn tất", "success"]);
                setLoading(false);
                showToast();
                setOpenDialog(false);
                setCurrentBook(null);
                setSelectedImage(null);
                setBooks(books.filter((e) => e.id !== book.id));
            });
    };

    const onChange = (book: Book | null) => {
        console.log(book);
        setCurrentBook(book);
        console.log(currentBook);
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
            [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
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

    return (
        <div className="container">
            <Toast onClose={() => setToggleBehavior(false)} isVisible={toggleSnackbar} message={snackbar[0]} bgColor={snackbar[1]} />
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className="my-custom-heading">Quản lý sách</h2>
                <div>
                    <button
                        className="btn btn-secondary my-custom-button me-2"
                        onClick={() =>
                            onChange({
                                author: "",
                                copies: 0,
                                copiesAvailable: 0,
                                description: "",
                                title: "",
                            } as Book)
                        }
                    >
                        Thêm
                    </button>
                    <ExcelExport fileName="book" jsonData={books.map((e) => ({ ...e, image: "Thông tin quá lớn để xuất" }))} sheetName="Sách" />
                </div>
            </div>
            <table className="table my-custom-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tiêu đề</th>
                        <th>Tác giả</th>
                        <th>Mô tả</th>
                        <th>Tổng</th>
                        <th>Còn</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <Modal ariaHideApp={false} isOpen={openDialog} onRequestClose={() => setOpenDialog(false)} style={style}>
                        {style === changeDataStyle ? (
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Tiêu đề</label>
                                    <input type="text" className="form-control" name="title" onChange={handleInputChange} value={currentBook?.title} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tác giả</label>
                                    <input type="text" className="form-control" name="author" onChange={handleInputChange} value={currentBook?.author} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Mô tả</label>
                                    <textarea className="form-control" name="description" onChange={handleInputChange} rows={10} value={currentBook?.description}></textarea>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Tổng số lượng</label>
                                    <input type="number" className="form-control" name="copies" onChange={handleInputChange} value={currentBook?.copies} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Còn lại</label>
                                    <input type="number" className="form-control" name="copiesAvailable" onChange={handleInputChange} value={currentBook?.copiesAvailable} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Ảnh</label>
                                    <input type="file" className="form-control" onChange={handleImageChange} />
                                    {currentBook?.image && !selectedImage && <img src={`${currentBook?.image}`} alt="Book Cover" style={{ marginTop: 10, maxWidth: 200 }} />}
                                </div>
                                <button onClick={() => (currentBook?.id ? updateBook(currentBook!) : addBook(currentBook!))} type="button" className="btn btn-primary my-custom-button">
                                    Lưu
                                </button>
                                <button type="button" className="btn btn-secondary my-custom-button" style={{ marginLeft: 4 }} onClick={() => setOpenDialog(false)}>
                                    Đóng
                                </button>
                            </form>
                        ) : style === deleteDataStyle ? (
                            <div className="text-center p-4">
                                <h5 className="text-danger mb-4">{`Bạn có chắc chắn muốn xoá sách "${currentBook?.title}"?`}</h5>
                                <div>
                                    <button onClick={() => deleteBook(currentBook!)} type="button" className="btn btn-danger my-custom-button me-3 px-4" style={{ fontWeight: "bold" }}>
                                        Xoá
                                    </button>
                                    <button onClick={() => setOpenDialog(false)} className="btn btn-secondary my-custom-button px-4">
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
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
                                <button className="btn btn-primary my-custom-button me-2 mt-1" onClick={() => onChange(book)}>
                                    Sửa
                                </button>
                                <button className="btn btn-danger my-custom-button mt-3" onClick={() => onDelete(book)}>
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
