import Modal from "react-bootstrap/Modal";
import CreateBrandForm from '../../../../components/forms/createForms/createBrandForm/createBrandForm';

export default function ModalCreateBrandForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nueva Marca</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateBrandForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

