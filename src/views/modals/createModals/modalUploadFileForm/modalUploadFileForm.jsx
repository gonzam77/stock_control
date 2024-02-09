import Modal from "react-bootstrap/Modal";
import CreateProductsFromXLSX from '../../../../components/forms/createForms/createProductsFromXLSX/createProductsFromXLSX';

export default function ModalUploadFileForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Subir archivo Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateProductsFromXLSX />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

