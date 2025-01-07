import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownRoles from "../../../dropdown/dropdownRol";
import DropdownStatus from "../../../dropdown/dropdownStatus";
import Swal from "sweetalert2";
import { backURL, axiosConfig } from "../../../../App";
import axios from "axios";

export default function CreateUserForm() {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    ID_TIPO_USUARIO: 1,
    NOMBRE: '',
    CLAVE:'',
    REPETIR_CLAVE:'',
    CUIL: '',
    ESTADO: 1,
  });

  async function postUser(newUser){
    try {
      axios.post(`${backURL}/usuario/nuevo`, newUser, axiosConfig)
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      
    }
  }

  const closeCreateModal = async (event) => {
    event.preventDefault();
    
    if(newUser.CLAVE !== newUser.REPETIR_CLAVE) {
      Swal.fire({
        title: 'Error!',
        text: 'Las claves no coinciden.',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
    } else {
      await postUser({ Usuario: newUser });
      dispatch(actions.hideCreateModal());
    };
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value.toUpperCase();
    setNewUser({
      ...newUser,
      [target]: value,
    });
  }

  const handleRolesSelect = (selectedRol) => {
    setNewUser({
      ...newUser,
      rol: selectedRol,
    });
  };
  const handleStatusSelect = (selectedStatus) => {
    setNewUser({
      ...newUser,
      status: selectedStatus,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={newUser.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="CUIL"
            value={newUser.CUIL}
            onChange={handleChange}
            placeholder="cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Clave</label>
          <input
            autoComplete="off"
            name="CLAVE"
            value={newUser.CLAVE}
            onChange={handleChange}
            type="password"
          />
        </div>
        <div className={styles.divs}>
          <label>Repetir Clave</label>
          <input
            type="password"
            autoComplete="off"
            name="REPETIR_CLAVE"
            value={newUser.REPETIR_CLAVE}
            onChange={handleChange}
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect}></DropdownStatus>
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
