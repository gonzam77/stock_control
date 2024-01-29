import styles from "./nav.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NavMenu({ logout }) {
  const navigate = useNavigate();
  function redirect() {
    navigate("/newSale");
  }
  return (
    <div className={`bg-body ${styles.container}`}>
      <div>
        <Navbar collapseOnSelect expand="lg" bg="" variant="">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse className="bg-body">
            <Nav>
              <Link to="/" className={styles.link}>
                Inicio
              </Link>
              <Link to="/cards" className={styles.link}>
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
              <Link to="/deposits" className={styles.link}>
                Depositos
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
      <div>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={redirect}
        >
          Nueva Venta
        </Button>
      </div>
      <div>
        <Button
          className={styles.createButton}
          variant="danger"
          onClick={()=>{logout()}}
        >
          Cerrar Sesion
        </Button>
      </div>
    </div>
  );
}
