import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Inicio from "./views/inicio/inicio";
import Nav from "./components/nav/nav";
import Clients from "./views/clients/clients";
import Suppliers from "./views/suppliers/suppliers";
import Dispatchers from "./views/dispatchers/dispatchers";
import ProductDetail from "./views/productDetail/productDetail";
import Users from "./views/users/users";
import Footer from "./components/footer/footer";
import ProductsTable from "./views/productsTable/productsTable";
import SaleDetail from './views/saleDetail/saleDeteail';
import Deposits from "./views/deposits/deposits";
import ProductsCard from "./views/productCards/productsCards";
import NomenclatorsPanel from "./views/nomenclatorsPanel/nomenclatorsPanel";
import Aside from "./components/aside/aside";
import AllSales from './views/allSales/allSales';
import NewSale from './views/newSale/newSale';
import Offers from './views/offers/offers'
import Account from './views/account/account'
import DepositDetail from './views/depositDetail/depositDetail';
import Purchases from "./views/purchases/purchases";
import NewPurchase from "./views/newPurchase/newPurchase";
import NewSettingForm from './views/newSetting/newSetting';
import NewTransferForm from './views/newTransfer/newTransfer';
// import Sales from "./views/sales/sales";
// import SaleInvoice from "./views/salesInvoice/salesInvoice";
// import Movements from "./views/movements/movements";
// import About from "./views/about/about";
// import Login from "./views/login/login";
//import { useState } from "react";


export const urlDev = "http://localhost:3000";

function App() {
  const location = useLocation();
  //const [access, setAccess] = useState(false);
  // const username = "gonzam77@gmail.com";
  // const password = "Medina2023";
  //const navigate = useNavigate();

  // function login(userData) {
  //   if (userData.password === password && userData.email === username) {
  //     setAccess(true);
  //     navigate("/");
  //   }
  // }

  // const logout = () => {
  //   setAccess(false);
  // };


  // useEffect(() => {
  //   !access && navigate("/login");
  // }, [access]);

  return (
    <div className="app-container">
      <div className="header">
        {location.pathname !== '/login' && <Nav />}
      </div>
      <div className="main-container">
        <div className="aside">
          <Aside />
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
            <Route path="/saleDetail/:id" element={<SaleDetail />} />
            <Route path="/depositDetail/:id" element={<DepositDetail />} />
            <Route path='/newSale' element={<NewSale />}/>
            <Route path='/newPurchase' element={<NewPurchase />}/>
            <Route path='/newSetting' element={<NewSettingForm />}/>
            <Route path='/newTransfer' element={<NewTransferForm />}/>
            <Route path='//offers' element={<Offers />}/>
            <Route path='/allSales' element={<AllSales />}/>
            <Route path='/accounts' element={<Account />}/>
            <Route path='/purchases' element={<Purchases />}/>
          </Routes>
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
