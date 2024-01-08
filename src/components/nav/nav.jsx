import styles from "./nav.module.css";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavMenu() {
  return (
    <div className={styles.container}>
      <Navbar collapseOnSelect expand="lg" bg="" variant="">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Link to="/" className={styles.link}>
              Productos
            </Link>
            <Link to="/suppliers" className={styles.link}>
              Proveedores
            </Link>
            <Link to="/clients" className={styles.link}>
              Clientes
            </Link>
            <Link to="/dispatchers" className={styles.link}>
              Tramportistas
            </Link>
            <Link to="/movements" className={styles.link}>
              Movimiento
            </Link>
            <Link to="/users" className={styles.link}>
              Usuarios
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
