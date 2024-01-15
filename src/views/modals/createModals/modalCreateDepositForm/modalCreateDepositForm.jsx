import Modal from "react-bootstrap/Modal";
import CreateDepositForm from '../../../../components/forms/createForms/createDepositForm/createDepositForm';

export default function ModalCreateDepositForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Deposito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDepositForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

