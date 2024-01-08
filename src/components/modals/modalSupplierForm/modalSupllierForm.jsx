import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import SupplierForm from '../../../views/Foms/supplierForm/supplierForm';


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
                <SupplierForm id={id} />
            </Modal.Body>

            <Modal.Footer>
            <Button variant="info" onClick={closeModal}>Confirmar</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
  );
}

export default ModalProductForm;