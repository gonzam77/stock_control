import Modal from "react-bootstrap/Modal";
import CreatePersonForm from '../../../../components/forms/createForms/createPersonForm/createPersonForm';

export default function ModalCreateClientForm() {

    return (
        <div className="modal show" style={{ display: "block", position: "" }}>
            <Modal.Dialog >
                <Modal.Header>
                    <Modal.Title>Cargar Persona</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CreatePersonForm />
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

