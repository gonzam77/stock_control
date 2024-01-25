import Modal from "react-bootstrap/Modal";
import CreateAccountForm from '../../../../components/forms/createForms/createAccountForm/createAccountForm';

export default function ModalCreateAccountForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nueva Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAccountForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

