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
  
  // Obtener los datos de los usuarios y el userId desde Redux
  const users = useSelector((state) => state.users);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  
   // Encontrar el usuario seleccionado basado en el userId
  const selectedUser = users.find((element) => element.ID_USUARIO === userId);

  const [user, setUser] = useState(selectedUser);

  useEffect(() => {
    if (selectedUser) {
      setUser(selectedUser); // Actualiza el estado local con el usuario seleccionado
    }
  }, [selectedUser]); // Dependencia: ejecuta cuando selectedUser cambia
 
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
    await putUser({ Usuario: user })
    dispatch(actions.cleanUsers());
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setUser({
      ...user,
      [target]: value
    });
  };

  const handleRolesSelect = (selectedRol) => {
    setUser({
      ...user,
      rol: selectedRol,
    });
  };

  const handleStatusSelect = (selectedStatus) => {
    setUser({
      ...user,
      status: selectedStatus,
    });
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
        <div className={styles.divs}>
          <label>CLAVE ANTERIOR</label>
          <input
            autoComplete="off"
            name="CLAVE_ANTERIOR"
            value={user.CLAVE_ANTERIOR}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className={styles.divs}>
          <label>CLAVE</label>
          <input
            autoComplete="off"
            name="NUEVA_CLAVE"
            value={user.NUEVA_CLAVE}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect}></DropdownStatus>
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
