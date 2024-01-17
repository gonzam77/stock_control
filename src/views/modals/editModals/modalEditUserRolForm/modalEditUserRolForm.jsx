import Modal from "react-bootstrap/Modal";
import EditUserRolForm from "../../../../components/forms/editForms/editUserRolForm/editUserRolForm";

export default function ModalEditRolForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserRolForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

