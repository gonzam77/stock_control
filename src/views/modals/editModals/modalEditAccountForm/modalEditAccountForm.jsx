import Modal from "react-bootstrap/Modal";
import EditAccountForm from "../../../../components/forms/editForms/editAcountForm/editAccountForm";

export default function ModalEditCategoryForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAccountForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

