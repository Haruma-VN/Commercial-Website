import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <div className="main-color">
            <footer
                className="container d-flex flex-wrap 
                justify-content-between align-items-center py-5 main-color"
            >
                <div className="col-md-2 mb-0 text-white">
                    © Copyright{" "}
                    <a href="https://github.com/Haruma-VN" style={{ textDecoration: "none", color: "white" }}>
                        Haruma-VN
                    </a>{" "}
                    2024
                    <p>
                        <strong>Số điện thoại:</strong>{" "}
                        <a href="tel:+84866804550" style={{ textDecoration: "none", color: "white" }}>
                            +8484866804550
                        </a>
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:khanhgia10a1@gmail.com" style={{ textDecoration: "none", color: "white" }}>
                            khanhgia10a1@gmail.com
                        </a>
                    </p>
                </div>

                <ul className="nav navbar-dark col-md-4 justify-content-end">
                    <li className="nav-item">
                        <Link to="/home" className="nav-link px-2 text-white">
                            Trang chủ
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/search" className="nav-link px-2 text-white">
                            Tìm kiếm sách
                        </Link>
                    </li>
                </ul>
            </footer>
        </div>
    );
};
