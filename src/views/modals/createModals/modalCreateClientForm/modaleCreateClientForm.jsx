import Modal from "react-bootstrap/Modal";
import CreateClientForm from '../../../../components/forms/createForms/createClientForm/createClientForm';

export default function ModalCreateClientForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateClientForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

