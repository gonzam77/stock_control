import { useEffect, useState } from "react";
import { axiosConfig, backURL } from "../../../../App";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import styles from "../createForms.module.css";
import DropdownAccount from "../../../dropdown/dropdownAccount";
import DropdownPersona from "../../../dropdown/dropdownPerson";
import axios from "axios";
import * as actions from "../../../../redux/actions";

export default function CreateClientForm() {
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.persons);
  const accounts = useSelector((state) => state.accounts);

  const [newClient, setNewClient] = useState({
    RAZON_SOCIAL: '',
    CUIL: '',
    ID_PERSONA: '',
    ID_CUENTA: '',
    ESTADO: 1
  });

  useEffect(() => {
    if (!personas.length) dispatch(actions.getAllPersons())
  }, [dispatch, personas])

  async function postClient(cliente) {
    try {
      await axios.post(`${backURL}/cliente/nuevo`, cliente, axiosConfig)
    } catch (error) {
      console.log(error);
    }
  };

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postClient({ Cliente: newClient })
    dispatch(actions.cleanClient());
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleAccountSelect(selectedAccount) {
    const accountId = accounts?.find((e) => e.DESCRIPCION === selectedAccount).ID_CUENTA;
    setNewClient({
      ...newClient,
      ID_CUENTA: accountId,
    });
  }
  function handlePersonSelect(selectedPerson) {
    if (selectedPerson !== '0') {
      const personId = personas?.find((e) => e.NOMBRE === selectedPerson).ID_PERSONA;
      setNewClient({
        ...newClient,
        ID_PERSONA: personId,
      });
    } else {
      setNewClient({
        ...newClient,
        ID_PERSONA: selectedPerson,
      });
    }
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
          <DropdownPersona onSelect={handlePersonSelect}></DropdownPersona>
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
          <DropdownAccount onSelect={handleAccountSelect}></DropdownAccount>
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
