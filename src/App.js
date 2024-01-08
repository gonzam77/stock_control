import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './views/home/Home';
import Nav from './components/nav/nav';
import Clients from './views/clients/clients';
import Suppliers from './views/suppliers/suppliers';
import Dispatchers from './views/dispatchers/dispatchers';
import ProductDetail from './views/productDetail/productDetail';
import Users from './views/users/users';
import About from './views/about/about';
import Footer from './components/footer/footer';
import Sales from './views/sales/sales';
import SaleInvoice from './views/salesInvoice/salesInvoice';
import Products from './views/products/products';
import CreateProductForm from './components/CreateForms/createProductForm/createProductForm';

export const urlDev = 'http://localhost:3000';

function App() {
  //const location = useLocation()
  
  return (
    <div className="App">
      <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/users" element={<Users />} />
          <Route path="/dispatchers" element={<Dispatchers />} />
          <Route path="/productDetail" element={<ProductDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/sales" element={<Sales />} />
          <Route path="/createProduct" element={<CreateProductForm />} />
          <Route path="/saleInvoice" element={<SaleInvoice />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      <Footer />  
      </div>
    );
}

export default App;
