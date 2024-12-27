import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2'

export default function EditClientForm() {
  const clients = useSelector((state) => state.clients);
  const clientId = useSelector((state) => state.clientId);
  const dispatch = useDispatch();
  const selectedlClient = clients.find((element) => element.ID_CLIENTE === clientId);
  const [client, setClient] = useState(selectedlClient);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  async function putClient(cliente) {
    try {
      await axios.put(`${backURL}/cliente/update`, cliente, axiosConfig)
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

  const closeModal = async (event) => {
    event.preventDefault();
    await putClient({ Cliente: client });
    dispatch(actions.cleanClient());
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setClient({
      ...client,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="RAZON_SOCIAL"
            value={client.RAZON_SOCIAL}
            onChange={handleChange}
            placeholder={selectedlClient.RAZON_SOCIAL}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>CUIL</label>
          <input
            autoComplete="off"
            name="CUIL"
            value={client.CUIL}
            onChange={handleChange}
            placeholder={selectedlClient.CUIL}
            type="text"
          />
        </div>
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
