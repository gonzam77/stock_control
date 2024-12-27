import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2'


export default function EditAccountTypeForm() {
  const accountTypes = useSelector((state) => state.accountTypes);
  const accountTypeId = useSelector((state) => state.accountTypeId);
  const dispatch = useDispatch();
  const selectedAccountType = accountTypes.find((element) => element.ID_TIPO_CUENTA === accountTypeId);

  const [accountType, setAccountType] = useState(selectedAccountType);

  const cancelModal = () => {
    dispatch(actions.hideModalEditAccounType());
  };

  async function putAccountType(tipoCuenta){
    try {
      await axios.put(`${backURL}/tipocuenta/update`,tipoCuenta, axiosConfig)
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
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putAccountType({ TipoCuenta: accountType});
    dispatch(actions.cleanAccountTypes());
    dispatch(actions.hideModalEditAccounType());
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
            name="DESCRIPCION"
            value={accountType.DESCRIPCION}
            onChange={handleChange}
            placeholder={selectedAccountType.DESCRIPCION}
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
