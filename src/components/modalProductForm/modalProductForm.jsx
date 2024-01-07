import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ProductForm from '../../views/productForm/productForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';


function ModalProductForm({closeModal, id}) {

    return (
        <div
        className="modal show"
        style={{ display: 'block', position: '' }}
        >
        <Modal.Dialog>
            <Modal.Header closeButton onClick={closeModal}>
            <Modal.Title >Editar Producto</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <ProductForm id={id} />
            </Modal.Body>

            <Modal.Footer>
            <Button variant="info" onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
  );
}

export default ModalProductForm;