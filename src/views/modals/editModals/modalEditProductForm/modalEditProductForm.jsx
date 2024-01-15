import Modal from "react-bootstrap/Modal";
import ProductForm from "../../../../components/forms/editForms/editProductForm/editProductForm";

function ModalEditProductForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditProductForm;
