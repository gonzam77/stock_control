import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditAccountTypeForm() {
  const accountTypes = useSelector((state) => state.accountTypes);
  const accountTypeId = useSelector((state) => state.accountTypeId);
  const dispatch = useDispatch();
  const selectedAccountType = accountTypes.find((element) => element.id === accountTypeId);

  const [accountType, setAccountType] = useState(selectedAccountType);

  const cancelModal = () => {
    dispatch(actions.hideModalAccountType());
  };

  const closeModal = (event) => {
    event.preventDefault();
    console.log(accountType);
    dispatch(actions.editAccountType(accountType));
    dispatch(actions.hideModalAccountType());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setAccountType({
      ...accountType,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="description"
            value={accountType.description}
            onChange={handleChange}
            placeholder={selectedAccountType.description}
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
