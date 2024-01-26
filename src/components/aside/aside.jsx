import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import styles from "./aside.module.css";

function Aside() {
  return (
    <div className={styles.container}>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand className={styles.nav_text} href="/allSales">Ventas</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand className={styles.nav_text} href="/purchases">Compras</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="/offers">Ofertas</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
          <Navbar.Brand className={styles.nav_text} href="/accounts">Cuentas</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand className={styles.nav_text} href="/newSetting">Ajuste Inventario</Navbar.Brand>
        </Container>
      </Navbar>
      <Navbar className={`bg-info ${styles.nav}`}>
        <Container>
            <Navbar.Brand href="/nomenclatorsPanel" className={styles.nav_text}>Nomencladores</Navbar.Brand>
        </Container>
      </Navbar>
    </div>
  );
}

export default Aside;
