import Modal from "react-bootstrap/Modal";
import EditDepositForm from "../../../../components/forms/editForms/editDepositForm/editDepositForm";

function ModalEditDepositForm() {
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title>Editar Deposito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditDepositForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

export default ModalEditDepositForm;
