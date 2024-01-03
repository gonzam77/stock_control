//import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from './views/home/Home'
import Nav from './components/nav/nav'


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
        </Routes>
      </div>
    );
}

export default App;
