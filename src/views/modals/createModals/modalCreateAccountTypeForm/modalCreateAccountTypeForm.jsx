import Modal from "react-bootstrap/Modal";
import CreateAccountTypeForm from '../../../../components/forms/createForms/createAccountTypeForm/createAccountTypeForm';

export default function ModaleCreateAccountType() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Tipo Cuenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateAccountTypeForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

