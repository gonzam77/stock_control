import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import CreateProductForm from "../../../components/CreateForms/createProductForm/createProductForm";
import styles from "./modalCreateProductForm.module.css";

function ModalProductForm() {
  const dispatch = useDispatch();

  const closeCreateModal = () => {
    console.log("cerrando");
    dispatch(actions.hideCreateModal());
  };

  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog className={styles.modalDialog}>
        <Modal.Header closeButton onClick={closeCreateModal}>
          <Modal.Title>Cargar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <CreateProductForm />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" onClick={closeCreateModal}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
