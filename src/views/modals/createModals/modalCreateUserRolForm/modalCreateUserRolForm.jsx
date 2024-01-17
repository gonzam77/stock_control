import Modal from "react-bootstrap/Modal";
import CreateUserRolForm from '../../../../components/forms/createForms/createUserRolForm/createUserRolForm';

export default function ModalCreateRolForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nuevo Rol</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUserRolForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

