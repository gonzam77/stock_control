import Modal from "react-bootstrap/Modal";
import EditClientForm from "../../../../components/forms/editForms/editClientForm/editClientForm";

function ModalEditClientForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditClientForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditClientForm;
