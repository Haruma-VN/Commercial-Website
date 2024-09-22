import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ManageUser from "./ManageUser";
import ManageBook from "./ManageBook";
import ManageCategory from "./ManageCategory";
import Dashboard from "./Dashboard";

const AdminHomePage = () => {
    const { user } = useContext(UserContext)!;
    const [selectedSection, setSelectedSection] = useState<string>("dashboard");

    // if (user === null) {
    //     return <h2>Vui lòng đăng nhập để xem trang</h2>;
    // }

    // if (user.userDetail.role !== "admin") {
    //     return <h2>Bạn không có quyền xem trang này</h2>;
    // }

    const renderContent = () => {
        switch (selectedSection) {
            case "user":
                return <ManageUser />;
            case "book":
                return <ManageBook />;
            case "category":
                return <ManageCategory />;
            default:
                return <Dashboard />;
        }
    };
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-lg-none">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Admin Panel
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("dashboard")}>
                                    Trang chủ
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("user")}>
                                    Quản lý người dùng
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("book")}>
                                    Quản lý sách
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("category")}>
                                    Quản lý danh mục
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="d-flex">
                <div className="sidebar bg-light border-right d-none d-lg-block" style={{ width: "250px", minHeight: "100vh" }}>
                    <h3 className="p-3">Admin Panel</h3>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item" onClick={() => setSelectedSection("dashboard")}>
                            <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("dashboard")}>
                                Trang chủ
                            </a>
                        </li>
                        <li className="list-group-item" onClick={() => setSelectedSection("user")}>
                            <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("user")}>
                                Quản lý người dùng
                            </a>
                        </li>
                        <li className="list-group-item" onClick={() => setSelectedSection("book")}>
                            <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("book")}>
                                Quản lý sách
                            </a>
                        </li>
                        <li className="list-group-item" onClick={() => setSelectedSection("category")}>
                            <a className="nav-link" href="#" type="button" onClick={() => setSelectedSection("category")}>
                                Quản lý danh mục
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="container-fluid p-4">{renderContent()}</div>
            </div>
        </>
    );
};

export default AdminHomePage;
