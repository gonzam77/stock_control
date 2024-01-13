import Modal from "react-bootstrap/Modal";
import ProductForm from "../../../components/forms/productForm/productForm";

function ModalProductForm({ id }) {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ProductForm id={id} />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
