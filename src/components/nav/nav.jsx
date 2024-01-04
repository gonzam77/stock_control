import style from "./nav.module.css";
//import SearchBar from '../SearchBar/SearchBar.jsx';
import { Link } from "react-router-dom";

export default function Nav() {
    return (
        <div>
            <div className={style.nav}>
                <Link to="/">
                    <button className={style.button}>Home</button>
                </Link>
                <Link to="/products">
                    <button className={style.button}>Productos</button>
                </Link>
                <Link to="/suppliers">
                    <button className={style.button}>Proveedores</button>
                </Link>
                <Link to="/clients">
                    <button className={style.button}>Clientes</button>
                </Link>
                <Link to="/users">
                    <button className={style.button}>Usuarios</button>
                </Link>
                <Link to="/dispatchers">
                    <button className={style.button}>Tramportistas</button>
                </Link>
                <Link to="/movements">
                    <button className={style.button}>Movimientos</button>
                </Link>
                {/* <div className={style.searchBar}>
                    <SearchBar className={style.searchBar} />
                </div> */}
            </div>
        </div>
    )
}