import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalCreateProductForm from "../../views/modals/modalCreateProductForm/modalCreateProductForm";
import CardDetail from "../../components/cardDetail/cardDetail";
import styles from "./productDetail.module.css";
import * as actions from "../../redux/actions";

export default function ProductDetail() {
  const { id } = useParams();
  const productId = parseInt(id)

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const showModalState = useSelector((state) => state.showCreateModal);
  const product = products.find((element) => element.id === productId);

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
        </Button >
        <Link to="/" className={styles.link}>
          <Button className={styles.backButton} variant="danger">Volver</Button>
        </Link>
      </div>
      <div className={styles.card}>
        <CardDetail
          id={product.id}
          code={product.code}
          name={product.name}
          image={product.image}
          price={product.price}
          stock={product.stock}
          cant_min={product.cant_min}
          cant_max={product.cant_max}
          proveedor={product.id_proveedor}
          fecha_alta={product.fecha_alta}
          fecha_vto={product.fecha_vto}
          unidad_medida={product.marca}
          description={product.description}
          marca={product.marca}>
        </CardDetail>
      </div>
      {showModalState && <ModalCreateProductForm />}
    </div>
  );
}
