import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditUserRolForm() {
  const roles = useSelector((state) => state.roles);
  const rolId = useSelector((state) => state.rolId);
  const dispatch = useDispatch();
  const selectedRol = roles.find((element) => element.id === rolId);

  const [rol, setRol] = useState(selectedRol);

  const cancelModal = () => {
    dispatch(actions.hideModalEditUserRol());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModalEditUserRol());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setRol({
      ...rol,
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
            name="name"
            value={rol.name}
            onChange={handleChange}
            placeholder={selectedRol.name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="description"
            value={rol.description}
            onChange={handleChange}
            placeholder={selectedRol.description}
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
