import { useState } from "react";
import styles from "../createFomrs.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";



export default function CreateDispatcherForm() {
  
  const dispatch = useDispatch();
  
  const [newDispatcher, setnewDispatcher] = useState({
    id:'',
    first_name: "",
    last_name: "",
    cuil: "",
    state: "",
    province: "",
    phone: "",
    email: "",
    adress: "",
    razon_social: "",
    create_date:''
  });
  
  const closeCreateModal = (event) => {
    event.preventDefault();
    setnewDispatcher({
      ...newDispatcher,
    })
    dispatch(actions.createDispatcher(newDispatcher));
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }
  
  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
      setnewDispatcher({
        ...newDispatcher,
        [target]: value,
      });
    }
  

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="first_name"
            value={newDispatcher.first_name}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="last_name"
            value={newDispatcher.last_name}
            onChange={handleChange}
            placeholder="Apellido..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>CUIL</label>
          <input
            autoComplete="off"
            name="cuil"
            value={newDispatcher.cuil}
            onChange={handleChange}
            placeholder="cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="razon_social"
            value={newDispatcher.razon_social}
            onChange={handleChange}
            placeholder="Razon Social..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={newDispatcher.adress}
            onChange={handleChange}
            placeholder="Barrio..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="email"
            value={newDispatcher.email}
            onChange={handleChange}
            placeholder="example@ejem.com.ar"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={newDispatcher.phone}
            onChange={handleChange}
            placeholder="266..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={newDispatcher.province}
            onChange={handleChange}
            placeholder="San Luis..."
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={newDispatcher.state}
            onChange={handleChange}
            placeholder="San Luis..."
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
