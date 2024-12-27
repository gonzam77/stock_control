import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

export default function CreateMesureForm() {
  const dispatch = useDispatch();
  const [newMesure, setNewMesure] = useState({
    NOMBRE: "",
    ABREVIATURA: "",
    TIPO:''
  });

  async function postMesure(medida){
    try {
      await axios.post(`${backURL}/unidad/nuevo`, medida, axiosConfig)
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

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postMesure({UnidadMedida: newMesure});
    dispatch(actions.cleanMesures());
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewMesure({
      ...newMesure,
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
            name="NOMBRE"
            value={newMesure.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Abreviacion</label>
          <input
            autoComplete="off"
            name="ABREVIATURA"
            value={newMesure.ABREVIATURA}
            onChange={handleChange}
            placeholder="Abreviatura..."
            type="text"
          />
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
