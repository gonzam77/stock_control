import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import styles from "../createFomrs.module.css";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const [newSupplier, setNewSupplier] = useState({
    id:1,
      cuenta:'',
      razon_social:'',
      cuil:'',
      adress:'',
      email:'',
      phone:'',
      province:'',
      state:'',
      create_date:'',
      fecha_actualizacion:''  
  });
  

  const closeCreateModal = (event) => {
    event.preventDefault();
    const date = new Date();
    setNewSupplier({
      ...newSupplier,
      create_date: date
    })
    dispatch(actions.createSupplier(newSupplier));
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewSupplier({
      ...newSupplier,
      [target]: value,
    });
  }

  return (
    <div className=''>
      <form className=''>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="razon_social"
            value={newSupplier.razon_social}
            onChange={handleChange}
            placeholder="Razon Socila..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={newSupplier.cuil}
            onChange={handleChange}
            placeholder="Cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>adress</label>
          <input
            autoComplete="off"
            name="adress"
            value={newSupplier.adress}
            onChange={handleChange}
            placeholder="Direccion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="email"
            value={newSupplier.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={newSupplier.phone}
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
            value={newSupplier.province}
            onChange={handleChange}
            placeholder="San Luis"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={newSupplier.state}
            onChange={handleChange}
            placeholder="San Luis"
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
