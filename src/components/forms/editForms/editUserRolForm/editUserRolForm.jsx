import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditUserRolForm() {
  const roles = useSelector((state) => state.userTypes);
  const rolId = useSelector((state) => state.rolId);
  const dispatch = useDispatch();
  console.log('roles',roles);
  const selectedRol = roles?.find((element) => element.ID_TIPO_USUARIO === rolId);

  const [rol, setRol] = useState(selectedRol);

  useEffect(()=>{
    if(!roles.length) dispatch(actions.getAllUserTypes());
  },[roles, dispatch])

  const cancelModal = () => {
    dispatch(actions.hideModalEditUserType());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModalEditUserType());
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
            name="DESCRIPCION"
            value={rol.DESCRIPCION}
            onChange={handleChange}
            placeholder={selectedRol.DESCRIPCION}
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
