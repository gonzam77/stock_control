import styles from "./depositDetail.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function DepositDetail() {
  const { id } = useParams();
  const shopping = useSelector((state) => state.shopping);
  const shop = shopping.find((e) => e.id === id);
  const products = useSelector((state) => state.products);
  const suppliers = useSelector((state) => state.suppliers);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();


//   id:'1',
//   id_compra:'1',
//   product_id:'1',
//   cantidad:5
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link to="/deposits" className={styles.link}>
          <Button variant="danger">Volver</Button>
        </Link>
      </div>
      <div className={styles.title}>
        <h1>Detalle de Compra {}</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Numero compra</th>
              <th>Fecha</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Vendedor</th>
              <th>Cliente</th>
              <th>CANTIDAD MIN</th>
              <th>CANTIDAD MAX</th>
              <th>STOCK TOTAL</th>
              <th>STOCK STOCK EN DEPOSITO</th>
            </tr>
          </thead>
          <tbody>
            {deposit?.items?.map((item, index) => {
              suppliers.find(
                (supplier) => (supplier.razon_social = item.supplier)
              );
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{item.code}</td>
                  <td>{item.categoria}</td>
                  <td>{item.name}</td>
                  <td>{item.marca}</td>
                  <td>{item.supplier}</td>
                  <td>{item.price}</td>
                  <td>{item.unidad_medida}</td>
                  <td>{item.cant_min}</td>
                  <td>{item.cant_max}</td>
                  <td>{item.stock}</td>
                  <td>{item.stock}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* {showModalState && <ModalEditClientForm />}
      {showCreateModal && <ModalCreateClientForm />} */}
    </div>
  );
}
