import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownAccountType from "../../../dropdown/dropdownAccountType";

export default function CreateAccountForm() {
  const dispatch = useDispatch();

  const [newAccount, setNewAccount] = useState({
    id: "",
    account_type: "",
    description: "",
    number: "",
  });

  const closeCreateModal = (event) => {
    event.preventDefault();
    setNewAccount({
      ...newAccount,
    });
    dispatch(actions.createAccount(newAccount));
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
    setNewAccount({
      ...newAccount,
      account_Type: selectedType,
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
            name="description"
            value={newAccount.description}
            onChange={handleChange}
            placeholder="Descripcion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Number</label>
          <input
            autoComplete="off"
            name="number"
            value={newAccount.number}
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
