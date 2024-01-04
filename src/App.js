//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './views/home/Home';
import Nav from './components/nav/nav';
import Clients from './views/clients/clients';
import Suppliers from './views/suppliers/suppliers';
import Dispatchers from './views/dispatchers/dispatchers';
import ProductList from './views/productsList/productList';
import ProductDetail from './views/productDetail/productDetail';
import Users from './views/users/users';
import About from './views/about/about';
import Footer from './components/footer/footer';

export const urlDev = 'http://localhost:3000';

//export const urlProduction = 'https://videogames-server-ypgw.onrender.com';
//export const URL = urlProduction;


function App() {
  const location = useLocation()
  
  return (
    <div className="App">
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dispatchers" element={<Dispatchers />} />
          <Route path="/productList" element={<ProductList />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      <Footer />  
      </div>
    );
}

export default App;
