import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import DropdownAccountType from "../../../dropdown/dropdownAccountType";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2'


export default function EditaccountForm() {
  const accounts = useSelector((state) => state.accounts);
  const accountId = useSelector((state) => state.accountId);
  const accountTypes = useSelector((state) => state.accountTypes);
  const dispatch = useDispatch();
  const selectedAccount = accounts.find((element) => element.ID_CUENTA === accountId);

  const [account, setAccount] = useState(selectedAccount);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  async function putAccount(cuenta) {
    try {
      await axios.put(`${backURL}/cuenta/update`, cuenta, axiosConfig)
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
  }

  const closeModal = async (event) => {
    event.preventDefault();
    await putAccount({ Cuenta: account })
    dispatch(actions.cleanAccount());
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
    const accountTypeId = accountTypes.find(e => e.DESCRIPCION === selectedAccount).ID_TIPO_CUENTA
    setAccount({
      ...account,
      ID_TIPO_CUENTA: accountTypeId,
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
            name="DESCRIPCION"
            value={account.DESCRIPCION}
            onChange={handleChange}
            placeholder={selectedAccount.DESCRIPCION}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Numero de Cuenta</label>
          <input
            autoComplete="off"
            name="NUMERO"
            value={account.NUMERO}
            onChange={handleChange}
            placeholder={selectedAccount.NUMERO}
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
