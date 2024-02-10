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
  const productId = parseInt(id);
  const dispatch = useDispatch();
  const showModalState = useSelector((state) => state.showCreateModal);
  const productById = useSelector((state) => state.productById);

  useEffect(() => {
    if (!productById) {
      dispatch(actions.getAllProducts());
      dispatch(actions.getProductById(productId));
    }
  }, [productById, dispatch, productId]);


  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
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
          <Button className={styles.backButton} variant="danger">
            Volver
          </Button>
        </Link>
      </div>
      <div className={styles.card}>
        <CardDetail
          id={productById?.ID_PRODUCTO}
          code={productById?.CODIGO}
          name={productById?.NOMBRE}
          price={productById?.PRECIO_VENTA}
          cant_min={productById?.CANT_MIN}
          cant_max={productById?.CANT_MAX}
          proveedor={productById?.PROVEEDOR.RAZON_SOCIAL}
          ID_UNIDAD_MEDIDA= {productById?.ID_UNIDAD_MEDIDA}
          fecha_alta={productById?.FECHA_ALTA}
          fecha_vto={productById?.FECHA_CADUCIDAD}
          description={productById?.DESCRIPCION}
        ></CardDetail>
      </div>
      {showModalState && <ModalCreateProductForm />}
    </div>
  );
}
