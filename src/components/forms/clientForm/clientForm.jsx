import { useState } from "react";
import styles from "./clientForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function ClientForm() {
  const clients = useSelector((state) => state.clients);
  const clientId = useSelector((state) => state.clientId);
  const dispatch = useDispatch();
  const selectedlClient = clients.find((element) => element.id === clientId);

  const [client, setClient] = useState(clients);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }
  
  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editClient(products));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    const editedClient = clients.map((element) => {
      if (element.id === clientId) {
        element[target] = value;
      }
      return element;
    });

    setClient({ editedClient });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label>Nombre</label>
        <br></br>
        <input
          autoComplete="off"
          name="first_name"
          value={client.first_name}
          onChange={handleChange}
          placeholder={selectedlClient.first_name}
          type="text"
        />
        <br></br>

        <label>Apellido</label>
        <br></br>
        <input
          autoComplete="off"
          name="lastName"
          value={client.lastName}
          onChange={handleChange}
          placeholder={selectedlClient.lastName}
          type="text"
        />
        <br></br>

        <label>Genero</label>
        <br></br>
        <input
          autoComplete="off"
          name="genero"
          value={client.genero}
          onChange={handleChange}
          placeholder={selectedlClient.genero}
          type="text"
        />
        <br></br>

        <label>Direccion</label>
        <br></br>
        <input
          autoComplete="off"
          name="adress"
          value={client.adress}
          onChange={handleChange}
          placeholder={selectedlClient.adress}
          type="text"
        />
        <br></br>

        <label>Telefono</label>
        <br></br>
        <input
          autoComplete="off"
          name="phone"
          value={client.adress}
          onChange={handleChange}
          placeholder={selectedlClient.phone}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Provincia</label>
        <br></br>
        <input
          autoComplete="off"
          name="province"
          value={client.province}
          onChange={handleChange}
          placeholder={selectedlClient.province}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Localidad</label>
        <br></br>
        <input
          autoComplete="off"
          name="state"
          value={client.adress}
          onChange={handleChange}
          placeholder={selectedlClient.state}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Fecha de Nacimiento</label>
        <br></br>
        <input
          autoComplete="off"
          name="fecha_nac"
          value={client.adress}
          onChange={handleChange}
          type="date"
        />
        <br></br>
        <br></br>

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
