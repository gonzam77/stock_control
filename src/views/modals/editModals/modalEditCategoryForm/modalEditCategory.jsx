import Modal from "react-bootstrap/Modal";
import EditCategoryForm from "../../../../components/forms/editForms/editCategoryForm/editCategoryForm";

export default function ModalEditCategoryForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Unidad de Medida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditCategoryForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

