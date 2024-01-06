import styles from "./nav.module.css";
import { useLocation } from "react-router-dom";
//import SearchBar from '../SearchBar/SearchBar.jsx';
import {  Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function NavMenu() {
    
    const location = useLocation();

    return (
        <div className={styles.container} >
            <Navbar collapseOnSelect expand='lg' bg="" variant="">
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav>
                        <Link to="/" className={styles.link}>Productos</Link>
                        <Link to="/clients" className={styles.link}>Clientes</Link>
                        <Link to="/suppliers" className={styles.link}>Proveedores</Link>
                        <Link to="/users" className={styles.link}>Usuarios</Link>
                        <Link to="/dispatchers" className={styles.link}>Tramportistas</Link>
                        <Link to="/movements" className={styles.link}>Movimiento</Link>
                        {
                            location.pathname ==='/' ? <Link to="/grid" className={styles.link}>Tabla</Link> : null
                        }
                        {
                            location.pathname ==='/grid' ? <Link to="/" className={styles.link}>Cartas</Link> : null
                        }
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
};