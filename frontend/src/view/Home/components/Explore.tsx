import { Link } from "react-router-dom";

export const Explore = () => {
    return (
        <div className="p-5 mb-4 bg-dark header">
            <div className="container-fluid py-5 text-white d-flex justify-content-center align-items-center">
                <div>
                    <h1 className="display-5 fw-bold">Hãy bắt đầu cuộc phiêu lưu của bạn</h1>
                    <p className="col-md-8 fs-4">Bạn muốn đi đâu tiếp?</p>
                    <Link to="/search" type="button" className="btn main-color btn-lg text-white">
                        Khám phá những cuốn sách hay nhất
                    </Link>
                </div>
            </div>
        </div>
    );
};
