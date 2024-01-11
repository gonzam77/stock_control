import Modal from "react-bootstrap/Modal";
import CreateProductForm from '../../../components/createFormsComponents/createProductForm/createProductForm'

function ModalCreateProductForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateProductForm />
        </Modal.Body>

        {/* <Modal.Footer>
          <Button variant="dark" onClick={closeCreateModal}>
            Confirmar
          </Button>
        </Modal.Footer> */}
      </Modal.Dialog>
    </div>
  );
}

export default ModalCreateProductForm;
