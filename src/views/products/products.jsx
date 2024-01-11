import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./products.module.css";
import Table from "react-bootstrap/Table";
import ModalProductForm from "../../views/modals/modalProductForm/modalProductForm";
import ModalCreateProductForm from "../../views/modals/modalCreateProductForm/modalCreateProductForm";
import * as actions from "../../redux/actions";

export default function Grid() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const products = useSelector((state) => state.products);
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getProductId(id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
          Cargar Nuevo
        </Button>

        <Link to="/" className={styles.link}>
          <Button variant="danger">Carta</Button>
        </Link>
      </div>

      <h1 className={styles.title}>Productos</h1>

      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>COD</th>
              <th>CATEGORIA</th>
              <th>PRODUCTO</th>
              <th>MARCA</th>
              <th>PROVEEDOR</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>UNIDAD MEDIDA</th>
              <th>CANTIDAD MIN</th>
              <th>CANTIDAD MAX</th>
              <th>MODIFICAR</th>
            </tr>
          </thead>
          <tbody>
            {products.map((producto, index) => {
              const supplier = suppliers.find(
                (supplier) => (supplier.cuil = producto.proveedor)
              );
              return (
                <tr key={index}>
                  <td>{producto.code}</td>
                  <td>{producto.categoria}</td>
                  <td>{producto.name}</td>
                  <td>{producto.marca}</td>
                  <td>
                    {supplier.razon_social}
                  </td>
                  <td>{producto.price}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.unidad_medida}</td>
                  <td>{producto.cant_min}</td>
                  <td>{producto.cant_max}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(producto.id)}
                    >
                      Modificar
                    </Button>
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
