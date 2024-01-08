import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ClientForm from '../../../components/forms/clientForm/clientForm';


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
                <ClientForm id={id} />
            </Modal.Body>

            <Modal.Footer>
            <Button variant="info" onClick={closeModal}>Confirmar</Button>
            </Modal.Footer>
        </Modal.Dialog>
        </div>
  );
}

export default ModalProductForm;