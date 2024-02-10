import Modal from "react-bootstrap/Modal";
import EditUbicationForm from "../../../../components/forms/editForms/editUbicationForm/editUbicationForm";

export default function ModalEditUbicationForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Ubicacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditUbicationForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

