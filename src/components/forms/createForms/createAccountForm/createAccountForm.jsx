import { useEffect, useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownAccountType from "../../../dropdown/dropdownAccountType";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function CreateAccountForm() {
  const dispatch = useDispatch();
  const accountTypes = useSelector(state => state.accountTypes)

  const [newAccount, setNewAccount] = useState({
    ID_TIPO_CUENTA: "",
    DESCRIPCION: "",
    NUMERO: "",
  });

  useEffect(()=>{
    if(!accountTypes.length) dispatch(actions.getAllAccountTypes())
  },[accountTypes, dispatch])

  async function postAccount(cuenta) {
    try {
      await axios.post(`${backURL}/cuenta/nuevo`, cuenta, axiosConfig)
    } catch (error) {
      console.log(error);
    }
  };

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postAccount({ Cuenta: newAccount})
    dispatch(actions.cleanAccount())
      dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewAccount({
      ...newAccount,
      [target]: value,
    });
  }

  const handleAccountTypeSelect = (selectedType) => {
    const accountTypeId = accountTypes?.find(e=>e.DESCRIPCION === selectedType).ID_TIPO_CUENTA;
    setNewAccount({
      ...newAccount,
      ID_TIPO_CUENTA: accountTypeId,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <DropdownAccountType onSelect={handleAccountTypeSelect} />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="DESCRIPCION"
            value={newAccount.DESCRIPCION}
            onChange={handleChange}
            placeholder="Descripcion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Number</label>
          <input
            autoComplete="off"
            name="NUMERO"
            value={newAccount.NUMERO}
            onChange={handleChange}
            placeholder="Numero de cuenta..."
            type="text"
          />
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
