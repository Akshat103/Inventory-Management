import './App.css';
import Nav from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import ProductList from './components/ProductList/ProductList';
import SignUp from './components/auth/SignUp';
import PrivateRoute from './components/auth/PrivateComponent';
import Login from './components/auth/Login';
import NotFound from './components/NotFound/NotFound';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<ProductList />} />
          </Route>
            <Route path='/signup' element={<SignUp />} />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<NotFound />}>
          </Route>
        </Routes>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

export default App;
