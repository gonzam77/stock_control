import { useState } from "react";
import styles from "../createFomrs.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";



export default function CreateDepositForm() {
  
  const dispatch = useDispatch();
  
  const [newDeposit, setNewDeposit] = useState({
    id:'',
    type:'',
    name:'',
    description:'',
    phone:'',
    adress:'',
    admin:'',
  });
  
  const closeCreateModal = (event) => {
    event.preventDefault();
    setNewDeposit({
      ...newDeposit,
    })
    dispatch(actions.createDeposit(newDeposit));
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }
  
  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
      setNewDeposit({
        ...newDeposit,
        [target]: value,
      });
    }
  

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Tipo</label>
          <input
            autoComplete="off"
            name="type"
            value={newDeposit.type}
            onChange={handleChange}
            placeholder="Tipo de deposito"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="name"
            value={newDeposit.name}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Administrador</label>
          <input
            autoComplete="off"
            name="admin"
            value={newDeposit.admin}
            onChange={handleChange}
            placeholder="Administrador..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="description"
            value={newDeposit.description}
            onChange={handleChange}
            placeholder="Descripcion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={newDeposit.phone}
            onChange={handleChange}
            placeholder="266..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={newDeposit.adress}
            onChange={handleChange}
            placeholder="Barrio..."
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
