import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer className="footer-container">
            <div className="container py-4">
                <div className="row">
                    <div className="col-md-4 text-white">
                        <p className="footer-text">
                            © Copyright{" "}
                            <a href="https://github.com/Haruma-VN" className="footer-link">
                                Haruma-VN
                            </a>{" "}
                            2024
                        </p>
                        <p className="footer-text">
                            <strong>Số điện thoại:</strong>{" "}
                            <a href="tel:+84866804550" className="footer-link">
                                +8484866804550
                            </a>
                        </p>
                        <p className="footer-text">
                            <strong>Email:</strong>{" "}
                            <a href="mailto:harumatsx@gmail.com" className="footer-link">
                                harumatsx@gmail.com
                            </a>
                        </p>
                    </div>

                    <div className="col-md-4 offset-md-4">
                        <ul className="nav flex-column align-items-end">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link footer-nav-link">
                                    Trang chủ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/search" className="nav-link footer-nav-link">
                                    Tìm kiếm sách
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
