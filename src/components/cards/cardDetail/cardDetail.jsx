import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './cardDetail.module.css';
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../../redux/actions';
import ModalEditProductForm from '../../../views/modals/editModals/modalEditProductForm/modalEditProductForm'

function CardDetail({
  name,
  code,
  id,
  unidad_medida,
  cant_min,
  cant_max,
  price,
  stock,
  proveedor,
  description,
  brand,
}) 
{
  const showModalState = useSelector(state => state.showModal);
  const dispatch = useDispatch();
  
  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getProductId(id));

  };

  return (
    <div className={styles.container}>
      <Card className="text-center">
        <Card.Header>Producto</Card.Header>
        <Card.Body>
          <Card.Title>
            {name} {brand}
          </Card.Title>
          <Card.Text>COD: {code}</Card.Text>
          <Card.Text>Precio: {price}</Card.Text>
          <Card.Text>Stock: {stock}</Card.Text>
          <Card.Text>Cant Min: {cant_min}</Card.Text>
          <Card.Text>Cant Max {cant_max}</Card.Text>
          <Card.Text>Proveedor: {proveedor}</Card.Text>
          <Card.Text>unidad_medida: {unidad_medida}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Button
              variant="primary"
              onClick={() => openModal(id)}
            >
              Modificar
            </Button>
        </Card.Footer>
      </Card>
      {showModalState && <ModalEditProductForm closeModal={closeModal} />}
    </div>
  );
}

export default CardDetail;
