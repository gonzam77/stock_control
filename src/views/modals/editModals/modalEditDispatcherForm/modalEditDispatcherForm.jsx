import Modal from "react-bootstrap/Modal";
import EditDispatcherForm from "../../../../components/forms/editForms/editDispatcherForm/editDispatcherForm";

function ModalEditDispatcherForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Transportista</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDispatcherForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditDispatcherForm;
