import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ProductForm from "../../../components/forms/productForm/productForm";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";

function ModalProductForm({ id }) {
  const dispatch = useDispatch();

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className="modal show" style={{ display: "block", position: "" }}>
      <Modal.Dialog>
        <Modal.Header closeButton onClick={closeModal}>
          <Modal.Title>Editar Producto</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <ProductForm id={id} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="info" onClick={closeModal}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

export default ModalProductForm;
