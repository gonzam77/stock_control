import { useState } from "react";
import styles from "./createClientForm.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";
//import Dropdown from '../../../components/dropDown/dropDown'



export default function CreateClientForm() {
  const dispatch = useDispatch();
  
  const [newClient, setNewClient] = useState({
    id:'',
    first_name: "",
    lastName: "",
    dni:'',
    cuil: "",
    fecha_nac: "",
    state: "",
    province: "",
    phone: "",
    email: "",
    adress: "",
    razon_social: "",
    genero: ""
  });
  
  const closeCreateModal = (event) => {
    event.preventDefault();
    dispatch(actions.createClient(newClient));
    dispatch(actions.hideCreateClientModal());
  };
  
  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
      setNewClient({
        ...newClient,
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
            value={newClient.first_name}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="lastName"
            value={newCleint.lastName}
            onChange={handleChange}
            placeholder="Apellido..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>DNI</label>
          <input
            autoComplete="off"
            name="dni"
            value={newClient.dni}
            onChange={handleChange}
            placeholder="DNI..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>CUIL</label>
          <input
            autoComplete="off"
            name="cuil"
            value={newClient.cuil}
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
            value={newClient.razon_social}
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
            value={newClient.adress}
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
            value={newClient.email}
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
            value={newClient.phone}
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
            value={newClient.province}
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
            value={newClient.satet}
            onChange={handleChange}
            placeholder="San Luis..."
          />
        </div>
        {/* <div>
          <Dropdown suppliers={suppliers} onSelect={handleSupplierSelect}></Dropdown>
        </div> */}

        <div className="modal-footer">
          <Button variant="danger" onClick={closeCreateModal}>
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
