import styles from "./home.module.css";
import Card from "../../components/card/card";
import { useSelector, useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ModalCreateProductForm from "../../views/modals/modalCreateProductForm/modalCreateProductForm";
import * as actions from "../../redux/actions";
import Create from "../../components/buttons/create/create";

export default function Home() {
  const products = useSelector((state) => state.products);
  const showModalState = useSelector((state) => state.showCreateModal);
  const dispatch = useDispatch();

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Create openCreateModal={openCreateModal}></Create>

        <Link to="/products" className={styles.link}>
          <Button variant="info">Tabla</Button>
        </Link>
      </div>

      <div className={styles.title}>
        <h1>Productos</h1>
      </div>

      <div className={styles.cards}>
        {products.map((product, index) => {
          return (
            <Card
              key={index}
              id={product.id}
              name={product.name}
              image={product.image}
              price={product.price}
              stock={product.stock}
              marca={product.marca}
              description={product.description}
            />
          );
        })}
      </div>
      {showModalState && <ModalCreateProductForm />}
    </div>
  );
}
