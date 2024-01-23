import { useEffect, useState } from "react";
import styles from "../createFomrs.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DropdownActive from "../../../dropdown/dropdownActive";
import moment from "moment/moment";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const date = new Date();
  console.log(date);

  const [newOffer, setNewOffer] = useState({
    id: "",
    product_id: "",
    discount: "",
    code: "",
    create_date: "",
    to_date: "",
    from_date: "",
  });

  useEffect(() => {
    const productInOffer = products.find((e) => e.code === newOffer.code);
    if (productInOffer) {
      setNewOffer({
        ...newOffer,
        product_id: productInOffer.id,
        create_date: date,
      });
    }
  }, [newOffer.code]);

  const closeCreateModal = (event) => {
    event.preventDefault();
    dispatch(actions.createOffer(newOffer));
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    let value = event.target.value;
    if(target !== 'to_date' && target !== 'from_date'){
      setNewOffer({
        ...newOffer,
        [target]: value,
      });
    } else {
      value = moment(value).format('yyyy-MM-DD');
      setNewOffer({
        ...newOffer,
        [target]: value,
      });

    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Codigo</label>
          <input
            autoComplete="off"
            name="code"
            value={newOffer.code}
            onChange={handleChange}
            placeholder="(0001)"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descuento</label>
          <input
            autoComplete="off"
            name="discount"
            value={newOffer.discount}
            onChange={handleChange}
            placeholder="Ejemplo...20"
            type="number"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Desde</label>
          <input
            autoComplete="off"
            name="from_date"
            value={newOffer.from_date}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="to_date"
            value={newOffer.to_date}
            onChange={handleChange}
            type="date"
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
