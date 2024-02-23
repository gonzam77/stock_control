import { useEffect, useState } from "react";
import styles from "../editForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DropdownUbication from "../../../dropdown/dropdownUbication";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function EditDepositForm() {
  const deposits = useSelector((state) => state.deposits);
  const depositId = useSelector((state) => state.depositId);
  const ubicaciones = useSelector((state) => state.ubicaciones);
  const dispatch = useDispatch();
  const selectedDeposit = deposits.find((element) => element.ID_BODEGA === depositId);
  
  const [deposit, setdeposit] = useState(selectedDeposit);
  
  useEffect(() => {
    if (!ubicaciones) dispatch(actions.getAllUbications());
    if (!deposits) dispatch(actions.getAllDeposits());
  }, [ubicaciones, deposits, dispatch])
  
  async function putDeposit(deposito){
    try {
      await axios.put(`${backURL}/bodega/update`, deposito, axiosConfig)
    } catch (error) {
      console.log(error);
    }
  }

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };
  
  const closeModal = async (event) => {
    event.preventDefault();
    await putDeposit({ Bodega: deposit})
    dispatch(actions.cleanDeposits());
    dispatch(actions.hideModal());
  };

  const handleUbicationSelect = (selectedUbication) => {
    if (selectedUbication !== "Desconocido" && selectedUbication) {
      const ubicacionId = ubicaciones.find(
        (e) => e.DIRECCION === selectedUbication
      ).ID_UBICACION;
      setdeposit({
        ...deposit,
        ID_UBICACION: ubicacionId,
      });
    } else {
      setdeposit({
        ...deposit,
        ID_UBICACION: null,
      });
    }
  };


  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setdeposit({
      ...deposit,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Tipo de Bodega</label>
          <input
            autoComplete="off"
            name="TIPO_BODEGA"
            value={deposit.TIPO_BODEGA}
            onChange={handleChange}
            placeholder={selectedDeposit.TIPO_BODEGA}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={deposit.NOMBRE}
            onChange={handleChange}
            placeholder={selectedDeposit.NOMBRE}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Administrador</label>
          <input
            autoComplete="off"
            name="ADMINISTRADOR"
            value={deposit.ADMINISTRADOR}
            onChange={handleChange}
            placeholder={selectedDeposit.ADMINISTRADOR}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="DESCRIPCION"
            value={deposit.DESCRIPCION}
            onChange={handleChange}
            placeholder={selectedDeposit.DESCRIPCION}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="TELEFONO"
            value={deposit.TELEFONO}
            onChange={handleChange}
            placeholder={selectedDeposit.TELEFONO}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownUbication
            onSelect={handleUbicationSelect}
          ></DropdownUbication>
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
