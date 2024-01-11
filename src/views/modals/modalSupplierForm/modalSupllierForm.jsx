import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import SupplierForm from "../../../components/forms/supplierForm/supplierForm";

function ModalProductForm({ closeModal, id }) {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <SupplierForm id={id} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="dark" onClick={closeModal}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
