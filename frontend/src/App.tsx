import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer } from "./view/Footer/Footer";
import HomePage from "./view/Home/HomePage";
import { Navbar } from "./view/Navbar/Navbar";
import SearchBookPage from "./view/Search/SearchBookPage";
import BookCheckoutPage from "./view/Checkout/BookCheckoutPage";
import LoginPage from "./view/Authentication/LoginPage";
import RegisterPage from "./view/Authentication/RegisterPage";
import { UserProvider } from "./context/UserContext";
import CartPage from "./view/Cart/CartPage";
import AdminHomePage from "./view/Admin/HomePage";

function App() {
    return (
        <UserProvider>
            <div className="d-flex flex-column min-vh-100">
                <Navbar />
                <div className="flex-grow-1">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/search" element={<SearchBookPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/checkout/:id" element={<BookCheckoutPage />} />
                        <Route path="/admin" element={<AdminHomePage />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </UserProvider>
    );
}

export default App;
