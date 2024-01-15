import Modal from "react-bootstrap/Modal";
import SupplierForm from "../../../../components/forms/editForms/editSupplierForm/editSupplierForm";

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
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
