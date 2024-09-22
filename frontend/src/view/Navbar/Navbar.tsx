import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export const Navbar = () => {
    const { user, setUser } = useContext(UserContext)!;
    const navigate = useNavigate();
    const onLogout = () => {
        setUser(null);
        navigate("/");
        window.location.reload();
    };
    return (
        <nav className="navbar navbar-expand-lg navbar-dark main-color py-3">
            <div className="container-fluid">
                <span className="navbar-brand">Shop bán sách</span>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle Navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">
                                Trang chủ
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/search">
                                Tìm kiếm sách
                            </NavLink>
                        </li>
                        {window.innerWidth > 900 ? (
                            <></>
                        ) : (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/cart">
                                    Giỏ hàng
                                </NavLink>
                            </li>
                        )}
                    </ul>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item m-1">
                            {user !== null && window.innerWidth > 900 ? (
                                <Link to="/cart" className="btn btn-outline-light" type="button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                                    </svg>
                                </Link>
                            ) : (
                                <></>
                            )}
                        </li>
                        <li className="nav-item m-1">
                            {user === null ? (
                                <Link to="/register" className="btn btn-outline-light" type="button">
                                    Đăng ký
                                </Link>
                            ) : (
                                <button type="button" onClick={onLogout} className="btn btn-outline-light">
                                    Đăng xuất
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
