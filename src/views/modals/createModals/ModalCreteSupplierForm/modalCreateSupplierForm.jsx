import Modal from "react-bootstrap/Modal";
import CreateSupplierForm from '../../../../components/forms/createForms/createSupplierForm/createSupplierForm';

function ModalCreateSupplierForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Proveedor</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateSupplierForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalCreateSupplierForm;
