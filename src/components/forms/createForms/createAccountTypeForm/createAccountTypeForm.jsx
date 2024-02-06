import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { backURL } from "../../../../App";
import styles from "../createForms.module.css";
import axios from "axios";
import * as actions from "../../../../redux/actions";

export default function CreateAccountTypeForm() {
  const dispatch = useDispatch();
  const [newAccountType, setNewAccountType] = useState({
    DESCRIPTION: "",
  });

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postAccountType({TipoCuenta: newAccountType})
    dispatch(actions.cleanAccountTypes());
    dispatch(actions.hideCreateModal());
  };

  async function postAccountType(tipoCuenta){
    try {
      await axios.post(`${backURL}/tipocuenta/nuevo`,tipoCuenta)
    } catch (error) {
      console.log(error);
    }
  }

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewAccountType({
      ...newAccountType,
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
            name="DESCRIPCION"
            value={newAccountType.DESCRIPCION}
            onChange={handleChange}
            placeholder="Descripcion..."
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
