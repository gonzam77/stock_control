import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import { formatDate } from "../../../date/date";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

export default function EditOfferForm() {
  const offers = useSelector((state) => state.offers);
  const offerId = useSelector((state) => state.offerId);
  const payTypes = useSelector((state) => state.payTypes);
  const dispatch = useDispatch();
  const selectedOffer = offers.find((element) => element.ID_DESCUENTO === offerId);
  const [offer, setOffer] = useState(selectedOffer);

  useEffect(()=>{
    if(!offers.length) dispatch(actions.getAllOffers());
    if(!payTypes.length) dispatch(actions.getAllPayTypes());
  },[offers, dispatch, payTypes])

  async function putOffer(oferta) {
    console.log('offer', offer);
    try {
      await axios.put(`${backURL}/descuento/update`, oferta, axiosConfig)
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
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putOffer({ Descuento: offer});
    dispatch(actions.cleanOffers());
    dispatch(actions.hideModal());
  };

  function handleSelectPayType(eventKey) {
    const selectedPayType = payTypes.find(e => e.NOMBRE === eventKey)
    if (selectedPayType) {
      setOffer({
        ...offer,
        ID_FORMA_PAGO: selectedPayType.ID_FORMA_PAGO
      })
    }
  };

  function handleChange(event) {
    const target = event.target.name;
    let value = event.target.value;
    
    if (target !== "FECHA_HASTA" && target !== "FECHA_DESDE") {
      setOffer({
        ...offer,
        [target]: value,
      });
    } else {
      const formattedDate = value ? `${value}T00:00:00` : null;
      setOffer({
        ...offer,
        [target]: formattedDate ? new Date(formattedDate) : null,
      });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={offer.NOMBRE}
            onChange={handleChange}
            placeholder={selectedOffer.NOMBRE}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="DESCRIPCION"
            value={offer.DESCRIPCION}
            onChange={handleChange}
            placeholder={selectedOffer.DESCRIPCION}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descuento</label>
          <input
            autoComplete="off"
            name="PORCENTAJE_DESCUENTO"
            value={offer.PORCENTAJE_DESCUENTO}
            onChange={handleChange}
            placeholder={selectedOffer.PORCENTAJE_DESCUENTO}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Desde</label>
          <input
            autoComplete="off"
            name="FECHA_DESDE"
            value={formatDate(offer.FECHA_DESDE, "yyyy-mm-dd")}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="FECHA_HASTA"
            value={formatDate(offer.FECHA_HASTA, "yyyy-mm-dd")}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <DropdownPayType onSelect={handleSelectPayType}></DropdownPayType>
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
