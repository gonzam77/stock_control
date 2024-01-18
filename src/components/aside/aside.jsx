import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./aside.module.css";

function Aside() {
  return (
    <div className={styles.container}>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Link to="/nomenclatorsPanel" className={`text-info ${styles.link}`}>
            <Navbar.Brand className={styles.nav_text}>Nomencladores</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="/products">Brand text</Navbar.Brand>
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
