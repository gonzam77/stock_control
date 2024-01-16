import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import styles from "./aside.module.css";

function Aside() {
  return (
    <>
      <Navbar className={`bg-primary ${styles.nav}`}>
        <Container>
          <Link to="/nomenclators" className={`text-primary ${styles.link}`}>
            <Navbar.Brand className={styles.nav_text}>Nomencladores</Navbar.Brand>
          </Link>
        </Container>
      </Navbar>
      <Navbar className={`bg-primary ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="/products">Brand text</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-primary ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="#home">Otro Menu</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-primary ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="#home">React Bootstrap</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Aside;
