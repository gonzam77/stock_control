import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from './card.module.css';
import ModalProductForm from '../../views/modals/modalProductForm/modalProductForm';
import * as actions from '../../redux/actions';

function BasicExample({ id, name, marca, price, stock }) {

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
    <div>
      <Card className={styles.card} style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{name} {marca}</Card.Title>
          <Card.Text>Sock: {stock}</Card.Text>
          <Card.Text>Precio: {price}</Card.Text>
          <Link to={`/productDetail/${id}`} className={styles.detailButton} >
            <Button variant="dark" >Detalle</Button>
          </Link>
          <Button
            variant="dark"
            onClick={() => openModal(id)}
          >
            Modificar
          </Button>
        </Card.Body>
      </Card>
      {showModalState && <ModalProductForm closeModal={closeModal} />}
    </div>
  );
}

export default BasicExample;