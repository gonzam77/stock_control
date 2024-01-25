import styles from "./shopping.module.css";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Shopping() {
  const shopping = useSelector((state) => state.shopping);
  const users = useSelector((state) => state.users);

  return (
    <div className={styles.container}>
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
              <th>Vendedor</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {shopping?.map((shop, index) => {
              const user = users.find((e) => shop.user_id == e.id);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{shop?.number}</td>
                  <td>{shop?.date}</td>
                  <td>{shop?.total_mount}</td>
                  <td>
                    {user.first_name} {user.last_name}
                  </td>
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/shoppingDetail${shop.id}`}>
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
