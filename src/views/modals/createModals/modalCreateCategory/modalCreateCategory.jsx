import Modal from "react-bootstrap/Modal";
import CreateCategoryForm from '../../../../components/forms/createForms/createCategoryForm/createCategoryForm';

export default function ModalCreateMesureForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nueva Categoria</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateCategoryForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

