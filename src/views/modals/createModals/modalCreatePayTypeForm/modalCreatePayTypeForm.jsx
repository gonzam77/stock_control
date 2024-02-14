import Modal from "react-bootstrap/Modal";
import CreatePayTypeForm from '../../../../components/forms/createForms/createPayTypeForm/creaetPayType';

export default function ModalCreatePayTypeForm() {
 
  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog >
        <Modal.Header>
          <Modal.Title>Cargar Nuevo Metodo de Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreatePayTypeForm />
        </Modal.Body>
      </Modal.Dialog>
    </div>
  );
}

