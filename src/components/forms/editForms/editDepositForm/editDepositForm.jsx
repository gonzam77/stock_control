import { useState } from "react";
import styles from "./editDepositForm.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";



export default function EditDepositForm() {
  
    const deposits = useSelector((state) => state.deposits);
    const depositId = useSelector((state) => state.depositId);
    const dispatch = useDispatch();
    const selectedDeposit = deposits.find((element) => element.id === depositId);
  
    const [deposit, setdeposit] = useState(selectedDeposit);
  
    const cancelModal = () => {
      dispatch(actions.hideModal());
    }
    
    const closeModal = (event) => {
      event.preventDefault();
      dispatch(actions.editDeposit(deposit));
      dispatch(actions.hideModal());
    };
  
    function handleChange(event) {
      const target = event.target.name;
      const value = event.target.value;
      setdeposit({
        ...deposit,
        [target]:value
      })
    }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Tipo</label>
          <input
            autoComplete="off"
            name="type"
            value={deposit.type}
            onChange={handleChange}
            placeholder={selectedDeposit.type}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="name"
            value={deposit.name}
            onChange={handleChange}
            placeholder={selectedDeposit.name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Administrador</label>
          <input
            autoComplete="off"
            name="admin"
            value={deposit.admin}
            onChange={handleChange}
            placeholder={selectedDeposit.admin}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="description"
            value={deposit.description}
            onChange={handleChange}
            placeholder={selectedDeposit.description}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={deposit.phone}
            onChange={handleChange}
            placeholder={selectedDeposit.phone}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={deposit.adress}
            onChange={handleChange}
            placeholder={selectedDeposit.adress}
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
