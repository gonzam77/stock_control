import Modal from "react-bootstrap/Modal";
import EditProductForm from "../../../../components/forms/editForms/editProductForm/editProductForm";

function ModalEditProductForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditProductForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditProductForm;
