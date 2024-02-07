import Modal from "react-bootstrap/Modal";
import EditBrandForm from "../../../../components/forms/editForms/editBrandForm/editBrandForm";

export default function ModalEditBrandForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditBrandForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

