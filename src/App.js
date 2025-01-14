import "./App.css";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Inicio from "./views/inicio/inicio";
import Login from "./views/login/login";
import Nav from "./components/nav/nav";
import Clients from "./views/clients/clients";
import Suppliers from "./views/suppliers/suppliers";
import Dispatchers from "./views/dispatchers/dispatchers";
import ProductDetail from "./views/productDetail/productDetail";
import Users from "./views/users/users";
import Footer from "./components/footer/footer";
import ProductsTable from "./views/productsTable/productsTable";
import SaleDetail from "./views/saleDetail/saleDeteail";
import Deposits from "./views/deposits/deposits";
import ProductsCard from "./views/productCards/productsCards";
import NomenclatorsPanel from "./views/nomenclatorsPanel/nomenclatorsPanel";
import Aside from "./components/aside/aside";
import AllSales from "./views/allSales/allSales";
import NewSale from "./views/newSale/newSale";
import Offers from "./views/offers/offers";
import Account from "./views/account/account";
import DepositDetail from "./views/depositDetail/depositDetail";
import Purchases from "./views/purchases/purchases";
import PurchasesDetail from "./views/purchaseDetail/purchaseDetail";
import NewPurchase from "./views/newPurchase/newPurchase";
import NewSettingForm from "./views/newSetting/newSetting";
import NewTransferForm from "./views/newTransfer/newTransfer";
import Movements from "./views/movements/movements";
import Swal from "sweetalert2";

//const cookieParser = require('cookie-parser')

const qs = require("qs");

export const urlDev = "http://localhost:3000";
export const backURL = "http://localhost:4000";
export let axiosConfig = null;

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [access, setAccess] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [token, setToken] = useState(null);

  async function login(userData) {
    
    const formEncodedData = qs.stringify(userData);
    console.log('userdata', formEncodedData);
    
    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    try {
      
      const response = await axios.post(
        `${backURL}/signin`,
        formEncodedData,
        config
      );

      if (response.data.Status === 'Accepted') {

        localStorage.setItem("token", response.data.Token);
        localStorage.setItem("usuario", userData.nombre);

        setToken(response.data.Token);

        axiosConfig = {
          withCredentials: true,
          headers: {
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Content-Type": "application/json",
            Pragma: "no-cache",
            Authorization: `Bearer ${token}`,
            Expires: 0,
          }
        };

        axios.interceptors.request.use((config) => {
          const token = localStorage.getItem("token");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
          return config;
        });

        setAccess(true);
        navigate("/");
      };
      
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.error('Error during login:', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.get(`${backURL}/signout`, axiosConfig);
      if (response.data.Status === 'OK') {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setToken(null);
        setAccess(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAccess(true);
      axiosConfig = {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
    } else {
      setAccess(false);
      navigate("/login");
    };
  }, [access, navigate]);

  return (
    <div className="app-container">
      <div className="header">
        {location.pathname !== "/login" && <Nav logout={logout} />}
      </div>
      <div className="main-container">
        {location.pathname !== "/login" && (
          <div className="aside">
            <Aside />
          </div>
        )}
        <div className="body">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/cards" element={<ProductsCard />} />
            <Route path="/productsTable" element={<ProductsTable />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/dispatchers" element={<Dispatchers />} />
            <Route path="/deposits" element={<Deposits />} />
            <Route path="/users" element={<Users />} />
            <Route path="/movements" element={<Movements />} />
            <Route path="/nomenclatorsPanel" element={<NomenclatorsPanel />} />
            <Route path="/productDetail/:id" element={<ProductDetail />} />
            <Route path="/saleDetail/:id" element={<SaleDetail />} />
            <Route path="/depositDetail/:id" element={<DepositDetail />} />
            <Route path="/newSale" element={<NewSale />} />
            <Route path="/newPurchase" element={<NewPurchase />} />
            <Route path="/newSetting" element={<NewSettingForm />} />
            <Route path="/newTransfer" element={<NewTransferForm />} />
            <Route path="//offers" element={<Offers />} />
            <Route path="/allSales" element={<AllSales />} />
            <Route path="/accounts" element={<Account />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/purchaseDetail/:id" element={<PurchasesDetail />} />
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
