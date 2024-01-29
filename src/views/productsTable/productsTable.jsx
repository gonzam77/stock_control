import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./productsTable.module.css";
import Table from "react-bootstrap/Table";
import ModalEditProductForm from "../modals/editModals/modalEditProductForm/modalEditProductForm";
import ModalCreateProductForm from "../modals/createModals/modalCreateProductForm/modalCreateProductForm";
import * as actions from "../../redux/actions";

export default function Products() {
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

        <Link to="/cards" className={styles.link}>
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
              <th>NOMBRE</th>
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
            {products.map((product, index) => {
              suppliers.find(
                (supplier) => (supplier.razon_social = product.supplier)
              );
              return (
                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                  <td>{product.code}</td>
                  <td>{product.categoria}</td>
                  <td>{product.name}</td>
                  <td>{product.brand}</td>
                  <td>
                    {product.supplier}
                  </td>
                  <td>{product.price}</td>
                  <td>{product.stock}</td>
                  <td>{product.unidad_medida}</td>
                  <td>{product.cant_min}</td>
                  <td>{product.cant_max}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(product.id)}
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
      {showModalState && <ModalEditProductForm />}
      {showCreateModal && <ModalCreateProductForm />}
    </div>
  );
}
