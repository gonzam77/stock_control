import { Button } from "react-bootstrap";
import styles from "./edit.module.css";
import * as actions from "../../../redux/actions";
import { useDispatch } from "react-redux";

export default function Edit({ id }) {
  const dispatch = useDispatch();

  const openModal = (productId) => {
    dispatch(actions.getProductId(productId));
    dispatch(actions.showModal());
  };

  return (
    <div>
      <Button
        className={styles.createButton}
        variant="info"
        onClick={() => openModal(id)}
      >
        Modificar
      </Button>
    </div>
  );
}
