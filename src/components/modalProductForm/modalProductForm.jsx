import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductForm from '../../views/productForm/productForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';


function ModalProductForm() {
  
    const productModal = useSelector(state => state.productModal)
    const dispatch = useDispatch();


    function handleCloseButton(){
        dispatch(actions.changeProductModal())
    }

  return (
    <div
      className="modal show"
      style={{ display: 'block', position: '' }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <ProductForm />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseButton}>Close</Button>
          <Button variant="primary" onClick={handleCloseButton}>Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;