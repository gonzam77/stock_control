import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import styles from "./productsTable.module.css";
import Table from "react-bootstrap/Table";
import ModalEditProductForm from "../modals/editModals/modalEditProductForm/modalEditProductForm";
import ModalCreateProductForm from "../modals/createModals/modalCreateProductForm/modalCreateProductForm";
import ModalUploadFileForm from "../modals/createModals/modalUploadFileForm/modalUploadFileForm";
import * as actions from "../../redux/actions";

export default function Products() {
  const showModalState = useSelector((state) => state.showModal);
  const showImportModal = useSelector((state) => state.showImportModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const products = useSelector((state) => state.products);
  const mesures = useSelector((state) => state.mesures);
  const marcas = useSelector((state) => state.brands);
  const categories = useSelector((state) => state.categories);
  const suppliers = useSelector((state) => state.suppliers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (products.length === 0) dispatch(actions.getAllProducts());
    if (suppliers.length === 0) dispatch(actions.getAllSuppliers());
    if (marcas.length === 0) dispatch(actions.getAllBrands());
    if (mesures.length === 0) dispatch(actions.getAllMesures());
    if (categories.length === 0) dispatch(actions.getAllCategories());
  }, [products, categories, suppliers, mesures, marcas, dispatch]);

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };
  
  const openImportModal = () => {
    dispatch(actions.showImportModal());
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
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openImportModal}
        >
          Importar Excel
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
              <th>CODIGO</th>
              <th>CATEGORIA</th>
              <th>NOMBRE</th>
              <th>MARCA</th>
              <th>PROVEEDOR</th>
              <th>PRECIO</th>
              <th>STOCK</th>
              <th>UNIDAD MEDIDA</th>
              <th>MODIFICAR</th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product, index) => {
              const supplier = suppliers.find(
                (supplier) => (supplier.ID_PROVEEDOR === product.ID_PROVEEDOR)
              );
              const marca = marcas?.find(e => e.ID_MARCA === product.ID_MARCA)
              const mesure = mesures?.find((e) => e.ID_UNIDAD_MEDIDA === product.ID_UNIDAD_MEDIDA);
              const category = categories?.find((e) => e.ID_CATEGORIA === product.ID_CATEGORIA);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{product.CODIGO}</td>
                  <td>{category?.NOMBRE}</td>
                  <td>{product.NOMBRE}</td>
                  <td>{marca?.NOMBRE}</td>
                  <td>{supplier?.RAZON_SOCIAL}</td>
                  <td>
                    {"$"}
                    {product.PRECIO_VENTA}
                  </td>
                  <td>{product.STOCK}</td>
                  <td>{mesure?.NOMBRE}</td>
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
      {showImportModal && <ModalUploadFileForm />}
      {showCreateModal && <ModalCreateProductForm />}
    </div>
  );
}
