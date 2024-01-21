import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./aside.module.css";

function Aside() {
  return (
    <div className={styles.container}>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand href="/nomenclatorsPanel" className={styles.nav_text}>Nomencladores</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand className={styles.nav_text} href="/allSales">Ventas</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="#inicio">Otro Menu</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="#inicio">React Bootstrap</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Aside;
