import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Inicio from "./views/inicio/inicio";
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
import ProductsTable from "./views/productsTable/productsTable";
import Deposits from "./views/deposits/deposits";
import ProductsCard from "./views/productCards/productsCards";
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
    <div className="app-container">
      <div className="header">
        {location.pathname !== '/login' && <Nav />}
      </div>
      <div className="main-container">
        <div className="aside">
          <Aside></Aside>
        </div>
        <div className="body">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/cards" element={<ProductsCard />} />
            <Route path="/productsTable" element={<ProductsTable />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/dispatchers" element={<Dispatchers />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/users" element={<Users />} />
            <Route path="/nomenclatorsPanel" element={<NomenclatorsPanel />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
}

export default App;
