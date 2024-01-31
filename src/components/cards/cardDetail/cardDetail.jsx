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
  cant_min,
  cant_max,
  price,
  stock,
  proveedor,
  description,
  brand,
  ID_UNIDAD_MEDIDA
}) 
{
  const showModalState = useSelector(state => state.showModal);
  const dispatch = useDispatch();
  const mesures = useSelector(state => state.mesures);
  const mesure = mesures.find(e=>e.ID_UNIDAD_MEDIDA === ID_UNIDAD_MEDIDA)
  

  const openModal = (id) => {
    console.log('id',id);
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
          <Card.Text>Unidad Medida: {mesure?.NOMBRE}</Card.Text>
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
      {showModalState && <ModalEditProductForm />}
    </div>
  );
}

export default CardDetail;
