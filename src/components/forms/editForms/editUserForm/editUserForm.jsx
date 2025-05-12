import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import styles from "../editForms.module.css";
import DropdownRoles from "../../../dropdown/dropdownRol";
import DropdownStatus from "../../../dropdown/dropdownStatus";
import {backURL} from "../../../../App"
import axios from "axios";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export default function EditUserForm() {
  
  const users = useSelector((state) => state.users);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  let status = null;
  
  const selectedUser = users.find((element) => element.ID_USUARIO === userId);

  const [user, setUser] = useState(selectedUser);
  
  if (user.ESTADO === 1) status = 'Activo'
  else status = 'Inactivo' ;

  useEffect(() => {
    //console.log(user);
  }, [user]);
 
  async function putUser(user) {
    try {
      await axios.put(`${backURL}/usuario/update`, user);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.log(error);
    }
  }

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }
  
  const closeModal = async (event) => {
    event.preventDefault();
    if (user.NUEVA_CLAVE === user.REPETIR_CLAVE) {
      await putUser({ Usuario: user })
      dispatch(actions.cleanUsers());
      dispatch(actions.hideModal());
    } else {
      Swal.fire({
        title: 'Error!',
        text: 'Las claves no coinciden',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
    }
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value.toUpperCase();
    setUser({
      ...user,
      [target]: value
    });
  };

  const handleRolesSelect = (selectedRol) => {
    setUser({
      ...user,
      ID_TIPO_USUARIO: parseInt(selectedRol),
    });
  };

  const handleStatusSelect = (selectedStatus) => {
    if(selectedStatus === 'Activo') user.ESTADO = 1;
    else user.ESTADO = 0;
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>NOMBRE</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={user.NOMBRE}
            onChange={handleChange}
            placeholder={user.NOMBRE}
            type="text"
          />
        </div>
        {/* <div className={styles.divs}>
          <label>CLAVE ANTERIOR</label>
          <input
            autoComplete="off"
            name="CLAVE_ANTERIOR"
            value={user.CLAVE_ANTERIOR}
            onChange={handleChange}
            type="password"
          />
        </div> */}
        <div className={styles.divs}>
          <label>NUEVA CLAVE</label>
          <input
            autoComplete="off"
            name="NUEVA_CLAVE"
            value={user.NUEVA_CLAVE}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className={styles.divs}>
          <label>REPETIR CLAVE</label>
          <input
            autoComplete="off"
            name="REPETIR_CLAVE"
            value={user.REPETIR_CLAVE}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect} initialValue={user.ID_TIPO_USUARIO}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect} initialValue={status}></DropdownStatus>
        </div>
        <div className="modal-footer">
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
