import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import DropdownAccountType from "../../../dropdown/dropdownAccountType";

export default function EditaccountForm() {
  const accounts = useSelector((state) => state.accounts);
  const accountId = useSelector((state) => state.accountId);
  const dispatch = useDispatch();
  const selectedAccount = accounts.find((element) => element.id === accountId);

  const [account, setAccount] = useState(selectedAccount);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editAccount(account));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setAccount({
      ...account,
      [target]: value,
    });
  }

  const handleAccountTypeSelect = (selectedAccount) => {
    setAccount({
      ...account,
      account_type: selectedAccount,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <DropdownAccountType onSelect={handleAccountTypeSelect}></DropdownAccountType>
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="description"
            value={account.description}
            onChange={handleChange}
            placeholder={selectedAccount.description}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Numero de Cuenta</label>
          <input
            autoComplete="off"
            name="number"
            value={account.number}
            onChange={handleChange}
            placeholder={selectedAccount.number}
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
