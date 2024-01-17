import Modal from "react-bootstrap/Modal";
import CreateMesureForm from '../../../../components/forms/createForms/createMesureForm/createMesureForm';

export default function ModalCreateMesureForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nueva Unidad de Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateMesureForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

