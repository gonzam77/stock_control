import Modal from "react-bootstrap/Modal";
import EditUserForm from "../../../../components/forms/editForms/editUserForm/editUserForm";

function ModalEditUserForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUserForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditUserForm;