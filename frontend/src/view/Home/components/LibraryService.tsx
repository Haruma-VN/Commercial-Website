import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const LibraryService = () => {
    const { user } = useContext(UserContext)!;
    return (
        <div className="container my-5">
            <div className="row p-4 align-items-center border shadow-lg">
                <div className="col-lg-7 p-3">
                    <h1 className="display-4 fw-bold">Bạn không thể tìm thấy sách?</h1>
                    <p className="lead">Nếu bạn không tìm thấy sách, hãy gửi một tin nhắn đến đội ngũ hỗ trợ!</p>
                    <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
                        {user === null ? (
                            <Link className="btn main-color btn-lg text-white" type="button" to="/login">
                                Đăng nhập
                            </Link>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className="col-lg-4 offset-lg-1 shadow-lg lost-image"></div>
            </div>
        </div>
    );
};

export default LibraryService;
