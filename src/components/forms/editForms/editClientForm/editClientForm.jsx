import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";

export default function ClientForm() {
  const clients = useSelector((state) => state.clients);
  const clientId = useSelector((state) => state.clientId);
  const dispatch = useDispatch();
  const selectedlClient = clients.find((element) => element.id === clientId);

  const [client, setClient] = useState(selectedlClient);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }
  
  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editClient(client));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setClient({
      ...client,
      [target]:value
    })
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="first_name"
            value={client.first_name}
            onChange={handleChange}
            placeholder={selectedlClient.first_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="last_name"
            value={client.last_name}
            onChange={handleChange}
            placeholder={selectedlClient.last_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="razon_social"
            value={client.razon_social}
            onChange={handleChange}
            placeholder={selectedlClient.razon_social}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={client.cuil}
            onChange={handleChange}
            placeholder={selectedlClient.cuil}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="email"
            value={client.email}
            onChange={handleChange}
            placeholder={selectedlClient.email}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={client.adress}
            onChange={handleChange}
            placeholder={selectedlClient.adress}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={client.adress}
            onChange={handleChange}
            placeholder={selectedlClient.phone}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={client.province}
            onChange={handleChange}
            placeholder={selectedlClient.province}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={client.adress}
            onChange={handleChange}
            placeholder={selectedlClient.state}
            type="text"
          />
        </div>
        <div class="modal-footer">
          <Button variant="danger" onClick={cancelModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeModal} >
            Confirmar
          </Button>
        </div>  
      </form>
    </div>
  );
}
