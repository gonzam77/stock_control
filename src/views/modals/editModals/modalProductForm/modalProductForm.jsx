import Modal from "react-bootstrap/Modal";
import ProductForm from "../../../components/forms/editForms/editProductForm/productForm";

function ModalProductForm() {
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

export default ModalProductForm;
