import Modal from "react-bootstrap/Modal";
import ClientForm from "../../../../components/forms/editForms/editClientForm/editClientForm";

function ModalProductForm({ closeModal, id }) {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ClientForm id={id} />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
