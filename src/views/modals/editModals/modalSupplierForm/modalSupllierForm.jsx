import Modal from "react-bootstrap/Modal";
import SupplierForm from "../../../../components/forms/editForms/editSupplierForm/editSupplierForm";

function ModalEditSupplierForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SupplierForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditSupplierForm;
