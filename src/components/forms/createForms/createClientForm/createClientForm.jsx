import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownAccount from "../../../dropdown/dropdownAccount";
import DropdownPersona from "../../../dropdown/dropdownPerson";

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.personas);
  const date = new Date();

  const [newClient, setNewClient] = useState({
    id: "",
    first_name: "",
    last_name: "",
    CUIL: "",
    state: "",
    province: "",
    phone: "",
    email: "",
    adress: "",
    RAZON_SOCIAL: "",
    create_date: "",
  });

  const closeCreateModal = (event) => {
    event.preventDefault();
    setNewClient({
      ...newClient,
    });
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handlePersonaSelect(selectedPerson) {
    const personId = personas.find((e) => e.DNI === selectedPerson).ID_PERSONA;
    setNewClient({
      ...newClient,
      ID_PERSONA: personId,
    });
  }

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewClient({
      ...newClient,
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
            value={newClient.RAZON_SOCIAL}
            onChange={handleChange}
            placeholder="Razon Social..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>CUIL</label>
          <input
            autoComplete="off"
            name="CUIL"
            value={newClient.CUIL}
            onChange={handleChange}
            placeholder="CUIL..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownAccount></DropdownAccount>
        </div>
        <div className="modal-footer">
          <Button variant="danger" onClick={cancelCreateModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeCreateModal}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
