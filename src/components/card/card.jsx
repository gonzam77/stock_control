import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./card.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import ModalProductForm from "../../views/modals/modalProductForm/modalProductForm";

function BasicExample({ id, name, marca, price, stock, description }) {
  const showModalState = useSelector((state) => state.showModal);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getProductId(id));
  };

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div>
      <Card className={styles.card} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>
            {name} {marca}
          </Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>Sock: {stock}</Card.Text>
          <Card.Text>Precio: {price}</Card.Text>
          <Button variant="info" onClick={() => openModal(id)}>
            Modificar
          </Button>
        </Card.Body>
      </Card>
      {showModalState && <ModalProductForm closeModal={closeModal} />}
    </div>
  );
}

export default BasicExample;
