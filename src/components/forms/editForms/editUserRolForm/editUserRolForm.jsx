import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import DropdownPermits from '../../../dropdown/dropdownPermits';
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function EditUserRolForm() {
  const roles = useSelector((state) => state.userTypes);
  const rolId = useSelector((state) => state.rolId);
  const dispatch = useDispatch();
  const selectedRol = roles?.find((element) => element.ID_TIPO_USUARIO === rolId);
  const [rol, setRol] = useState(selectedRol);

  useEffect(() => {
    if (!roles.length) dispatch(actions.getAllUserTypes());
  }, [roles, dispatch]);

  async function putUserType(tipo) {
    try {
      await axios.put(`${backURL}/tipo/update`, tipo, axiosConfig)
    } catch (error) {
      console.log(error);
    }
  }

  const cancelModal = () => {
    dispatch(actions.hideModalEditUserType());
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putUserType({ TipoUsuario: rol });
    dispatch(actions.cleanUserTypes());
    dispatch(actions.hideModalEditUserType());
  };

  const handlePermitsRead = (eventkey) => {
    if (eventkey === 'Si') {
      setRol({
        ...rol,
        READ: 1
      })
    } else {
      setRol({
        ...rol,
        READ: 0
      })
    }
  }
  const handlePermitsCreate = (eventkey) => {
    if (eventkey === 'Si') {
      setRol({
        ...rol,
        CREATE: 1
      })
    } else {
      setRol({
        ...rol,
        CREATE: 0
      })
    }
  }
  const handlePermitsUpdate = (eventkey) => {
    if (eventkey === 'Si') {
      setRol({
        ...rol,
        UPDATE: 1
      })
    } else {
      setRol({
        ...rol,
        UPDATE: 0
      })
    }
  };

  const handlePermitsDelete = (eventkey) => {
    if (eventkey === 'Si') {
      setRol({
        ...rol,
        DELETE: 1
      })
    } else {
      setRol({
        ...rol,
        DELETE: 0
      })
    }
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
        <div className={styles.divs}></div>
        <h5>Permisos</h5>
        <div className={styles.divs}>
          <span>Ver</span>
           <DropdownPermits onSelect={handlePermitsRead}></DropdownPermits>
        </div>
        <div className={styles.divs}>
          <span>Crear</span>
           <DropdownPermits onSelect={handlePermitsCreate}></DropdownPermits>
        </div>
        <div className={styles.divs}>
          <span>Modificar</span>
          <DropdownPermits onSelect={handlePermitsUpdate}></DropdownPermits>
        </div>
        <div className={styles.divs}>
          <span>Eliminar</span>
          <DropdownPermits onSelect={handlePermitsDelete}></DropdownPermits>
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
