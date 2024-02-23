import styles from "./productsCards.module.css";
import Card from "../../components/cards/card/card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalCreateProductForm from "../modals/createModals/modalCreateProductForm/modalCreateProductForm";
import * as actions from "../../redux/actions";
import PaginateNative from "../../components/pagination/paginationNative";

export default function ProductsCard() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const showModalState = useSelector((state) => state.showCreateModal);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProduct = products?.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    if (products.length === 0) {
      dispatch(actions.getAllProducts());
    }
  }, [products, dispatch]);

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`conatiner-fluid ${styles.container}`}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
          Cargar Nuevo
        </Button>

        <Link to="/productsTable" className={styles.link}>
          <Button variant="danger">Tabla</Button>
        </Link>
      </div>

      <div className={styles.title}>
        <h1>Productos</h1>
      </div>

      <div className={styles.paginate}>
        <PaginateNative
          productsPerPage={productsPerPage}
          products={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>

      <div className={styles.cards}>
        {currentProduct?.map((product, index) => {
          return (
            <Card
              key={index}
              id={product.ID_PRODUCTO}
              code={product.CODIGO}
              name={product?.NOMBRE}
              image={product.IMAGEN}
              price={product.PRECIO_VENTA}
              stock={product.STOCK}
              brand={product.ID_MARCA}
              description={product.DESCRIPCION}
              supplier={product.ID_PROVEEDOR}
            />
          );
        })}
      </div>
      {showModalState && <ModalCreateProductForm />}
    </div>
  );
}
