import styles from "./depositDetail.module.css";
import { useSelector } from "react-redux";
//import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useParams, Link } from "react-router-dom";

export default function DepositDetail() {
  const { id } = useParams();
  // const idInt = parseInt(id);
  const deposits = useSelector((state) => state.deposits);
  const suppliers = useSelector((state) => state.suppliers);
  const deposit = deposits.find((e) => e.id === id);
  //const dispatch = useDispatch();

  // const openModal = (id) => {
  //   dispatch(actions.showModal());
  //   dispatch(actions.getClientId(id));
  // };

  return (
    <div className={styles.container}>
      {/* <div className={styles.titleContainer}>
            <Button className={styles.createButton} variant="success" onClick={openCreateModal}>
            Cargar Nuevo
            </Button>
        </div> */}
      <div className={styles.titleContainer}>
        <Link to="/deposits" className={styles.link}>
          <Button variant="danger">Volver</Button>
        </Link>
      </div>

      <div className={styles.title}>
        <h1>Deposito { }</h1>
      </div>
      <div className={styles.tableContainer}>
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>COD</th>
              <th>CATEGORIA</th>
              <th>NOMBRE</th>
              <th>brand</th>
              <th>PROVEEDOR</th>
              <th>PRECIO</th>
              <th>UNIDAD MEDIDA</th>
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
                  <td>{item.brand}</td>
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
