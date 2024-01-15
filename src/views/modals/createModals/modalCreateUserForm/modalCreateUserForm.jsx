import Modal from "react-bootstrap/Modal";
import CreateUserForm from '../../../../components/forms/createForms/createUserForm/createUserForm';

export default function ModalCreateUserForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUserForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}
