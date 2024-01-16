import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Home from "./views/home/Home";
import Nav from "./components/nav/nav";
import Clients from "./views/clients/clients";
import Suppliers from "./views/suppliers/suppliers";
import Dispatchers from "./views/dispatchers/dispatchers";
import ProductDetail from "./views/productDetail/productDetail";
import Users from "./views/users/users";
import About from "./views/about/about";
import Footer from "./components/footer/footer";
import Sales from "./views/sales/sales";
import SaleInvoice from "./views/salesInvoice/salesInvoice";
import Products from "./views/products/products";
import Deposits from "./views/deposits/deposits";
import Dashboard from "./views/dashboard/dashboard";
import Movements from "./views/movements/movements";
import NomenclatorsPanel from "./views/nomenclatorsPanel/nomenclatorsPanel";
import Login from "./views/login/login";
import { useState } from "react";
import Aside from "./components/aside/aside";


export const urlDev = "http://localhost:3000";

function App() {
  const location = useLocation();
  const [access, setAccess] = useState(false);
  const username = "gonzam77@gmail.com";
  const password = "Medina2023";

  function login(userData) {
    if (userData.password === password && userData.email === username) {
      setAccess(true);
      navigate("/");
    }
  }

  // const logout = () => {
  //   setAccess(false);
  // };

  const navigate = useNavigate();

  // useEffect(() => {
  //   console.log(access);
  //   !access && navigate("/login");
  // }, [access]);

  return (
    <div className="App bg-body-secondary">
      {location.path !== "/login" && <Nav />}
      <Routes>
        <Route path="/login" element={<Login login={login} />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/nomenclators" element={<NomenclatorsPanel />} />
        <Route path="/cards" element={<Home />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/users" element={<Users />} />
        <Route path="/dispatchers" element={<Dispatchers />} />
        <Route path="/productDetail/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/deposits" element={<Deposits />} />
        <Route path="/movements" element={<Movements />} />
        <Route path="/saleInvoice" element={<SaleInvoice />} />
        <Route path="/products" element={<Products />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
