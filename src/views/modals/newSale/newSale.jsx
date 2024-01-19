import Modal from "react-bootstrap/Modal";
import NewSale from '../../../components/forms/createForms/newSale/newSale';

export default function ModalNewSale() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Nueva Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewSale />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
};

