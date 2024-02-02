import Modal from "react-bootstrap/Modal";
import EditpersonForm from "../../../../components/forms/editForms/editPersonForm/editPersonForm";

export default function ModalEditPersonForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditpersonForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

