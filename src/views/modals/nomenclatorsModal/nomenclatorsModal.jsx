import Modal from "react-bootstrap/Modal";

function NomenclatorsModal({ form }) {
    return (
        <div className="modal show" style={{ display: "block", position: "" }}>
            <Modal.Dialog>
                <Modal.Header >
                    <Modal.Title>Crear Rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {form}
                </Modal.Body>
            </Modal.Dialog>
        </div>
    );
}

export default NomenclatorsModal;