import Modal from "react-bootstrap/Modal";
import EditPayTypeForm from "../../../../components/forms/editForms/editPayTypeForm/editPayTypeForm";

export default function ModalEditBrandForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Metodo de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditPayTypeForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

