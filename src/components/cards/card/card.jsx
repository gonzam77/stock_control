import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './card.module.css';
import ModalEditProductForm from '../../../views/modals/editModals/modalEditProductForm/modalEditProductForm';
import * as actions from '../../../redux/actions';

function ProductCard({ id, name, marca, price, stock, supplier }) {

  const showModalState = useSelector(state => state.showModal);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getProductId(id));

  };

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className={styles.name}>{name} {marca}</Card.Title>
          <Card.Text>Sock: {stock}</Card.Text>
          <Card.Text>Precio: {price}</Card.Text>
          <Card.Text>Proveedor: {supplier}</Card.Text>
          <Link to={`/productDetail/${id}`} className={styles.detailButton} >
            <Button variant="primary" >Detalle</Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => openModal(id)}
          >
            Modificar
          </Button>
        </Card.Body>
      </Card>
      {showModalState && <ModalEditProductForm closeModal={closeModal} />}
    </div>
  );
}

export default ProductCard;