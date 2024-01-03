import logo from './logo.svg';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';


export const urlDev = 'http://localhost:3001';
//export const urlProduction = 'https://videogames-server-ypgw.onrender.com';
//export const URL = urlProduction;


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <p>Hola!</p>
      </header>
    </div>
  );
}

export default App;
