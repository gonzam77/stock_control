import Modal from "react-bootstrap/Modal";
import CreateUbicationForm from '../../../../components/forms/createForms/createUbicationForm/createUbicationForm';

export default function ModalCreateUbicationForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nueva Ubicacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateUbicationForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

