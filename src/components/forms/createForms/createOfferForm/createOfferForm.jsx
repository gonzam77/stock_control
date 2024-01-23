import { useEffect, useState } from "react";
import styles from "../createFomrs.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const date = new Date();

  const [newOffer, setNewOffer] = useState({
    id: "",
    product_id: "",
    discount: "",
    code: "",
    create_date: null,
    to_date: null,
    from_date: null,
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
  
    if (target !== "to_date" && target !== "from_date") {
      setNewOffer({
        ...newOffer,
        [target]: value,
      });
    } else {
      const formattedDate = value ? `${value}T00:00:00` : null;
      setNewOffer({
        ...newOffer,
        [target]: formattedDate ? new Date(formattedDate) : null,
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
            value={newOffer.from_date ? newOffer.from_date.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="to_date"
            value={newOffer.to_date ? newOffer.to_date.toISOString().split('T')[0] : ''}
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
