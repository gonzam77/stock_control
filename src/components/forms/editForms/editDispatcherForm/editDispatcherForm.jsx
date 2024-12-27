import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { backURL, axiosConfig } from "../../../../App";
import axios from "axios";
import Swal from 'sweetalert2';

export default function EditDispatcherForm() {
  const dispatchers = useSelector((state) => state.dispatchers);
  const dispatcherId = useSelector((state) => state.dispatcherId);
  const dispatch = useDispatch();
  const selectedlDispatcher = dispatchers.find(
    (element) => element.id === dispatcherId
  );

  const [dispatcher, setDispatcher] = useState(selectedlDispatcher);

  async function putDispatcher(dispatcher) {
    try {
      await axios.put(`${backURL}/tramportista/update`, dispatcher, axiosConfig)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.log(error);
    }
  }

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putDispatcher({ Tramportista: dispatcher });
    dispatch(actions.cleanDispatcher());
    dispatch(actions.hideModal());
    setDispatcher({
      ...setDispatcher
    })
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className="modal-footer">
          <Button variant="danger" onClick={cancelModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeModal}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
