import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";

export default function EditDispatcherForm() {
  const dispatchers = useSelector((state) => state.dispatchers);
  const dispatcherId = useSelector((state) => state.dispatcherId);
  const dispatch = useDispatch();
  const selectedlDispatcher = dispatchers.find(
    (element) => element.id === dispatcherId
  );

  const [dispatcher, setDispatcher] = useState(selectedlDispatcher);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editDispatcher(dispatcher));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setDispatcher({
      ...dispatcher,
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
            value={dispatcher.first_name}
            onChange={handleChange}
            placeholder={selectedlDispatcher.first_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="last_name"
            value={dispatcher.last_name}
            onChange={handleChange}
            placeholder={selectedlDispatcher.last_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={dispatcher.cuil}
            onChange={handleChange}
            placeholder={selectedlDispatcher.cuil}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={dispatcher.adress}
            onChange={handleChange}
            placeholder={selectedlDispatcher.adress}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={dispatcher.adress}
            onChange={handleChange}
            placeholder={selectedlDispatcher.phone}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={dispatcher.province}
            onChange={handleChange}
            placeholder={selectedlDispatcher.province}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={dispatcher.adress}
            onChange={handleChange}
            placeholder={selectedlDispatcher.state}
            type="text"
          />
        </div>
        <div class="modal-footer">
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
