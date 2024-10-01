import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import ManageUser from "./ManageUser";
import ManageBook from "./ManageBook";
import ManageCategory from "./ManageCategory";
import Dashboard from "./Dashboard";
import "./HomePage.css";
import Exception from "../Exception/Exception";

const AdminHomePage = () => {
    const { user } = useContext(UserContext)!;
    const [selectedSection, setSelectedSection] = useState<string>("dashboard");

    if (user === null) {
        return <Exception message="Vui lòng đăng nhập để xem trang" />;
    }

    if (user.userDetail.role !== "admin") {
        return <Exception message="Bạn không có quyền xem trang này" />;
    }

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

    const exchanger = (section: string): string => {
        const data = {
            dashboard: "Trang chủ",
            book: "Quản lý Sách",
            category: "Quản lý Danh mục",
            user: "Quản lý Người dùng",
        } as Record<string, string>;
        return data[section];
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-lg-none custom-navbar">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">
                        Admin Panel
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {["dashboard", "user", "book", "category"].map((section) => (
                                <li className="nav-item" key={section}>
                                    <a className="nav-link custom-nav-link" href="#" onClick={() => setSelectedSection(section)}>
                                        {exchanger(section)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="d-flex">
                <div className="sidebar bg-light custom-sidebar d-none d-lg-block" style={{ width: "250px", minHeight: "100vh" }}>
                    <h3 className="p-3">Admin Panel</h3>
                    <ul className="list-group list-group-flush">
                        {["dashboard", "user", "book", "category"].map((section) => (
                            <li className={`list-group-item custom-list-group-item`} key={section}>
                                <a className={`nav-link custom-nav-link`} href="#" onClick={() => setSelectedSection(section)}>
                                    {exchanger(section)}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="container-fluid p-4 custom-container">{renderContent()}</div>
            </div>
        </>
    );
};

export default AdminHomePage;
