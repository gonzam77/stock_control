import Modal from "react-bootstrap/Modal";
import EditMesureForm from "../../../../components/forms/editForms/editMesureForm/editMesureForm";

export default function ModalEditMesureForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Unidad de Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditMesureForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

