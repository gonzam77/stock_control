import styles from "./purchases.module.css";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Purchases() {
  const purchases = useSelector((state) => state.purchases);

  

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link to='/newPurchase'>
          <Button className={styles.createButton} variant="success" >
            Nueva Compra
          </Button>
        </Link>
      </div>
      <div className={styles.title}>
        <h1>Compras</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N° Compra</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Proveedor</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {purchases?.map((purchase, index) => {
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{purchase?.number}</td>
                  <td>{purchase?.date}</td>
                  <td>{'$'}{purchase?.total_mount}</td>
                  <td>{purchase.supplier}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/purchaseDetail/${purchase.id}`}>
                      <Button variant="primary">Detalle</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
