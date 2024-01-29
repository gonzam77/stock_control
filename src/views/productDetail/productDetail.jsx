import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalCreateProductForm from "../modals/createModals/modalCreateProductForm/modalCreateProductForm";
import CardDetail from "../../components/cards/cardDetail/cardDetail";
import styles from "./productDetail.module.css";
import * as actions from "../../redux/actions";
import { useEffect } from "react";

export default function ProductDetail() {
  const { id } = useParams();
  console.log('params',id);
  const productId = parseInt(id);

  const dispatch = useDispatch();
  const showModalState = useSelector((state) => state.showCreateModal);
  const productById = useSelector((state) => state.productById);
  console.log('prod',productById);

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  dispatch(actions.getProductById(productId));
  
  useEffect(() => {
  }, [productById]);

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
          <Button className={styles.backButton} variant="danger">
            Volver
          </Button>
        </Link>
      </div>
      <div className={styles.card}>
        <CardDetail
          id={productById.ID_PRODUCTO}
          code={productById.CODIGO}
          name={productById.NOMBRE}
          image={productById.IMAGEN}
          price={productById.PRECIO_VENTA}
          cant_min={productById.CANT_MIN}
          cant_max={productById.CANT_MAX}
          proveedor={productById.PROVEEDOR.RAZON_SOCIAL}
          fecha_alta={productById.FECHA_ALTA}
          fecha_vto={productById.FECHA_CADUCIDAD}
          description={productById.DESCRIPCION}
        ></CardDetail>
      </div>
      {showModalState && <ModalCreateProductForm />}
    </div>
  );
}
