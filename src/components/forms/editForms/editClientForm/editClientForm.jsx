import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownPersona from "../../../dropdown/dropdownPerson";
import axios from "axios";
import { backURL } from "../../../../App";

export default function EditClientForm() {
  const clients = useSelector((state) => state.clients);
  console.log("clients", clients);
  const clientId = useSelector((state) => state.clientId);
  console.log("clientsId", clientId);
  const personas = useSelector((state) => state.personas);
  const dispatch = useDispatch();
  const selectedlClient = clients?.find(
    (element) => element.ID_CLIENTE === clientId
  );
  console.log("selected", selectedlClient);

  const [client, setClient] = useState(selectedlClient);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  async function putClient(cliente) {
    await axios.put(`${backURL}/cliente/update`, cliente);
    return;
  }

  const closeModal = async (event) => {
    event.preventDefault();
    await putClient({ Cliente: client });
    dispatch(actions.cleanClients());
    dispatch(actions.hideModal());
  };

  function handlePersonSelect(selectedPerson) {
    const personId = personas?.find((e) => e.DNI === selectedPerson).ID_PERSONA;
    setClient({
      ...client,
      ID_PERSONA: personId,
    });
  }

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
          <DropdownPersona onSelect={handlePersonSelect}></DropdownPersona>
        </div>
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
