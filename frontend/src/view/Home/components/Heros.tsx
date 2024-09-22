import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../context/UserContext";

const Heros = () => {
    const { user } = useContext(UserContext)!;
    return (
        <div>
            <div className="d-none d-lg-block">
                <div className="row g-0 mt-5">
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-left"></div>
                    </div>
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="m1-2">
                            <h1>Bạn đang muốn đọc gì vậy?</h1>
                            <p className="lead">
                                Đội phát triển muốn biết bạn muốn đọc sách gì? Liệu rằng đó là sách để nâng cao kĩ năng chuyên môn, kĩ năng mềm, học tiếng anh, v.v... Chúng tôi hoàn toàn có thể cung cấp tài nguyên cho bạn đọc!
                            </p>
                            {user === null ? (
                                <Link to="/login" className="btn main-color btn-lg text-white">
                                    Đăng nhập
                                </Link>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row g-0">
                    <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
                        <div className="m1-2">
                            <h1>Bộ sách của chúng tôi luôn được cập nhật thường xuyên</h1>
                            <p className="lead">Hãy thử đọc sách thường xuyên và xem có điều gì thay đổi không nhé</p>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                        <div className="col-image-right"></div>
                    </div>
                </div>
            </div>

            <div className="d-lg-none">
                <div className="container">
                    <div className="m-2">
                        <div className="col-image-left"></div>
                        <div className="mt-2">
                            <h1>Bạn đang muốn đọc gì vậy?</h1>
                            <p className="lead">
                                Đội phát triển muốn biết bạn muốn đọc sách gì? Liệu rằng đó là sách để nâng cao kĩ năng chuyên môn, kĩ năng mềm, học tiếng anh, v.v... Chúng tôi hoàn toàn có thể cung cấp tài nguyên cho bạn đọc!
                            </p>
                            {user === null ? (
                                <Link to="/login" className="btn main-color btn-lg text-white">
                                    Đăng nhập
                                </Link>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                    <div className="m-2">
                        <div className="col-image-right"></div>
                        <div className="mt-2">
                            <h1>Bộ sách của chúng tôi luôn được cập nhật thường xuyên</h1>
                            <p className="lead">Hãy thử đọc sách thường xuyên và xem có điều gì thay đổi không nhé</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Heros;
