import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import styles from "./productsTable.module.css";
import Table from "react-bootstrap/Table";
import ModalEditProductForm from "../modals/editModals/modalEditProductForm/modalEditProductForm";
import ModalCreateProductForm from "../modals/createModals/modalCreateProductForm/modalCreateProductForm";
import * as actions from "../../redux/actions";
import { useEffect } from "react";

export default function Products() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const products = useSelector((state) => state.products);
  const mesures = useSelector((state) => state.mesures);
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) {
      dispatch(actions.getAllProducts());
    }
  }, [products]);

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
            {products?.map((product, index) => {
              suppliers.find(
                (supplier) => (supplier.razon_social = product.supplier)
              );
              let mesure = null
              product.ID_UNIDAD_MEDIDA ? 
              mesure = mesures.find((e) => e.ID_UNIDAD_MEDIDA === product.ID_UNIDAD_MEDIDA) : null;
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{product.CODIGO}</td>
                  <td>{product.CATEGORIA}</td>
                  <td>{product.NOMBRE}</td>
                  <td>{product.MARCA}</td>
                  <td>{product.PROVEEDOR.RAZON_SOCIAL}</td>
                  <td>
                    {"$"}
                    {product.PRECIO_VENTA}
                  </td>
                  <td></td>
                  <td>{mesure?.NOMBRE}</td>
                  <td>{product.CANT_MIN}</td>
                  <td>{product.CANT_MAX}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(product.ID_PRODUCTO)}
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
