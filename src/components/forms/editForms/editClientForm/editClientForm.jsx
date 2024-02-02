import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownPersona from "../../../dropdown/dropdownPerson";

export default function EditClientForm() {
  const clients = useSelector((state) => state.clients);
  const clientId = useSelector((state) => state.clientId);
  const personas = useSelector((state) => state.personas);
  const dispatch = useDispatch();
  const selectedlClient = clients.find((element) => element.id === clientId);

  const [client, setClient] = useState(selectedlClient);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModal());
  };

  function handlePersonaSelect(selectedPerson) {
    const personId = personas.find((e) => e.DNI === selectedPerson).ID_PERSONA;
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
          <DropdownPersona onSelect={handlePersonaSelect}></DropdownPersona>
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
        <div class="modal-footer">
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
