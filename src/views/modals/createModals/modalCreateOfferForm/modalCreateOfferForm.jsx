import Modal from "react-bootstrap/Modal";
import CreateOfferForm from '../../../../components/forms/createForms/createOfferForm/createOfferForm';

export default function ModalCreateOfferForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Nueva Oferta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateOfferForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}


