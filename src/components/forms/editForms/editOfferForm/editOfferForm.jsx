import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import { formatDate } from "../../../date/date";

export default function EditOfferForm() {
  const offers = useSelector((state) => state.offers);
  const offerId = useSelector((state) => state.offerId);
  const dispatch = useDispatch();
  const selectedOffer = offers.find((element) => element.id === offerId);

  const [offer, setOffer] = useState(selectedOffer);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editOffer(offer));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    let value = event.target.value;
    
    if (target !== "to_date" && target !== "from_date") {
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
          <label>Descuento</label>
          <input
            autoComplete="off"
            name="discount"
            value={offer.discount}
            onChange={handleChange}
            placeholder={selectedOffer.discount}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Desde</label>
          <input
            autoComplete="off"
            name="from_date"
            value={formatDate(offer.from, "yyyy-mm-dd")}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="to_date"
            value={formatDate(offer.to_date, "yyyy-mm-dd")}
            onChange={handleChange}
            type="date"
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
