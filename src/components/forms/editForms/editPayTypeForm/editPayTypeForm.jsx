import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import axios from "axios";
import { backURL } from "../../../../App";

export default function EditPayTypeForm() {
  const payTypes = useSelector((state) => state.payTypes);
  const payTypeId = useSelector((state) => state.payTypeId);
  const dispatch = useDispatch();
  const selectedPayType = payTypes.find((element) => element.ID_FORMA_PAGO === payTypeId);

  const [payType, setPayType] = useState(selectedPayType);

  useEffect(()=>{
    if(!payTypes.length) dispatch(actions.getAllPayTypes());
  },[payTypes, dispatch]);

  async function putPayType(pago){
    try {
      await axios.put(`${backURL}/pago/update`, pago)
    } catch (error) {
      console.log(error);
    }
  };

  const cancelModal = () => {
    dispatch(actions.hideModalEditPayType());
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putPayType({UnidadMedida: payType});
    dispatch(actions.cleanPayTypes());
    dispatch(actions.hideModalEditPayType());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setPayType({
      ...payType,
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
            value={payType.NOMBRE}
            onChange={handleChange}
            placeholder={selectedPayType.NOMBRE}
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
