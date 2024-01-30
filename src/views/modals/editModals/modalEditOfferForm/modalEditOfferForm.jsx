import Modal from "react-bootstrap/Modal";
import EditOfferForm from "../../../../components/forms/editForms/editOfferForm/editOfferForm";

function ModalEditOfferForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Oferta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditOfferForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditOfferForm;
