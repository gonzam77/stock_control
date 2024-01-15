import Modal from "react-bootstrap/Modal";
import CreateDispatcherForm from '../../../../components/forms/createForms/createDispatcherForm/createDispatcherForm';

export default function ModalCreateDispatcherForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Transportista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateDispatcherForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

