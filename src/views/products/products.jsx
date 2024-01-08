import styles from "./products.module.css";
import Table from "react-bootstrap/Table";
import ModalProductForm from "../../views/modals/modalProductForm/modalProductForm";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Edit from "../../components/buttons/edit/edit";
import Create from "../../components/buttons/create/create";
import ModalCreateProductForm from "../../views/modals/modalCreateProductForm/modalCreateProductForm";

export default function Grid() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Create openCreateModal={openCreateModal}></Create>

        <Link to="/" className={styles.link}>
          <Button variant="info">Carta</Button>
        </Link>
      </div>

      <h1 className={styles.title}>Productos</h1>

      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>COD</th>
              <th>PRODUCTO</th>
              <th>MARCA</th>
              <th>PROVEEDOR</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>UNIDAD MEDIDA</th>
              <th>CANTIDAD MIN</th>
              <th>CANTIDAD MAX</th>
              <th>FECHA ALTA</th>
              <th>FECHA VTO</th>
              <th>MODIFICAR</th>
            </tr>
          </thead>
          <tbody>
            {products.map((producto, index) => {
              return (
                <tr key={index}>
                  <td>{producto.code}</td>
                  <td>{producto.name}</td>
                  <td>{producto.marca}</td>
                  <td>{producto.id_proveedor}</td>
                  <td>{producto.price}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.unidad_medida}</td>
                  <td>{producto.cant_min}</td>
                  <td>{producto.cant_max}</td>
                  <td>{producto.fecha_alta}</td>
                  <td>{producto.fecha_vto}</td>
                  <td>
                    <Edit id={producto.id}></Edit>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalState && <ModalProductForm />}
      {showCreateModal && <ModalCreateProductForm />}
    </div>
  );
}
