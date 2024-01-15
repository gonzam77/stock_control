import Modal from "react-bootstrap/Modal";
import CreateProductForm from '../../../../components/forms/createForms/createProductForm/createProductForm';

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
      </Modal.Dialog>
    </div>
  );
}

export default ModalCreateProductForm;
