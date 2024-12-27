import { useEffect, useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownUbication from "../../../dropdown/dropdownUbication";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';


export default function CreateDepositForm() {
  
  const dispatch = useDispatch();
  const ubicaciones = useSelector(state => state.ubicaciones);
  
  const [newDeposit, setNewDeposit] = useState({
    TIPO_BODEGA:'',
    NOMBRE:'',
    ADMINISTRADOR:'',
    TELEFONO:'',
    DESCRIPCION:'',
    ID_UBICACION:null,
    ESTADO:1
  });

  useEffect(()=>{
    if(ubicaciones || !ubicaciones?.length) dispatch(actions.getAllUbications());
  },[ubicaciones,dispatch])
  
  async function postDeposit(deposito){
    try {
      await axios.post(`${backURL}/bodega/nuevo`, deposito, axiosConfig)
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
    await postDeposit({Bodega: newDeposit})
    dispatch(actions.cleanDeposits())
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }

  const handleUbicationSelect = (selectedUbication) => {
    if (selectedUbication !== "Desconocido" && selectedUbication) {
      const ubicacionId = ubicaciones.find(
        (e) => e.DIRECCION === selectedUbication
      ).ID_UBICACION;
      setNewDeposit({
        ...newDeposit,
        ID_UBICACION: ubicacionId,
      });
    } else {
      setNewDeposit({
        ...newDeposit,
        ID_UBICACION: ''
      });
    }
  };
  
  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
      setNewDeposit({
        ...newDeposit,
        [target]: value,
      });
    }
  

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Tipo</label>
          <input
            autoComplete="off"
            name="TIPO_BODEGA"
            value={newDeposit.TIPO_BODEGA}
            onChange={handleChange}
            placeholder="Tipo de deposito"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={newDeposit.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Administrador</label>
          <input
            autoComplete="off"
            name="ADMINISTRADOR"
            value={newDeposit.ADMINISTRADOR}
            onChange={handleChange}
            placeholder="Administrador..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="DESCRIPCION"
            value={newDeposit.DESCRIPCION}
            onChange={handleChange}
            placeholder="Descripcion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="TELEFONO"
            value={newDeposit.TELEFONO}
            onChange={handleChange}
            placeholder="266..."
            type="text"
          />
        </div>
        {/* <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={newDeposit.adress}
            onChange={handleChange}
            placeholder="Barrio..."
            type="text"
          />
        </div> */}
        <div className={styles.divs}>
          <DropdownUbication
            onSelect={handleUbicationSelect}
          ></DropdownUbication>
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
