import Modal from "react-bootstrap/Modal";
import EditAccountTypeForm from "../../../../components/forms/editForms/editAccountTypeForm/editAccountTypeForm";

export default function ModalEditAccountTypeForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Tipo de Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditAccountTypeForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

