import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

export default function EditMesureForm() {
  const mesures = useSelector((state) => state.mesures);
  const mesureId = useSelector((state) => state.mesureId);
  const dispatch = useDispatch();
  const selectedMesure = mesures.find((element) => element.ID_UNIDAD_MEDIDA === mesureId);

  const [mesure, setMesure] = useState(selectedMesure);

  useEffect(()=>{
    if(!mesures.length) dispatch(actions.getAllMesures());
  },[mesures, dispatch]);

  async function putMesure(medida){
    try {
      await axios.put(`${backURL}/unidad/update`, medida, axiosConfig)
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
  };

  const cancelModal = () => {
    dispatch(actions.hideModalEditMesure());
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putMesure({UnidadMedida: mesure});
    dispatch(actions.cleanMesures());
    dispatch(actions.hideModalEditMesure());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setMesure({
      ...mesure,
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
            value={mesure.NOMBRE}
            onChange={handleChange}
            placeholder={selectedMesure.NOMBRE}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Abreviacion</label>
          <input
            autoComplete="off"
            name="ABREVIATURA"
            value={mesure.ABREVIATURA}
            onChange={handleChange}
            placeholder={selectedMesure.ABREVIATURA}
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
