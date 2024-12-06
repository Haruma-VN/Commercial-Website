import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import HomePage from './components/Home/HomePage';
import Navbar from './components/Navbar/Navbar';
import SearchBookPage from './components/Search/SearchBookPage';
import BookCheckoutPage from './components/Checkout/BookCheckoutPage';
import LoginPage from './components/Authentication/LoginPage';
import RegisterPage from './components/Authentication/RegisterPage';
import { UserProvider } from './context/UserContext';
import CartPage from './components/Cart/CartPage';
import AdminHomePage from './components/Admin/HomePage';
import ReviewPage from './components/Review/ReviewPage';
import CategoryPage from './components/Category/CategoryPage';

function App() {
	return (
		<UserProvider>
			<div className='d-flex flex-column min-vh-100'>
				<Navbar />
				<div className='flex-grow-1'>
					<Routes>
						<Route path='/' element={<Navigate to='/home' />} />
						<Route path='/home' element={<HomePage />} />
						<Route path='/search' element={<SearchBookPage />} />
						<Route path='/login' element={<LoginPage />} />
						<Route path='/cart' element={<CartPage />} />
						<Route path='/register' element={<RegisterPage />} />
						<Route path='/checkout/:id' element={<BookCheckoutPage />} />
						<Route path='/review/:id' element={<ReviewPage />} />
						<Route path='/admin' element={<AdminHomePage />} />
						<Route path='/category/:id' element={<CategoryPage />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</UserProvider>
	);
}

export default App;
