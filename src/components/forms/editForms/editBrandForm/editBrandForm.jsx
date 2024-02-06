import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditBrandForm() {
  const brands = useSelector((state) => state.brands);
  const brandId = useSelector((state) => state.brandId);
  const dispatch = useDispatch();
  const selectedBrand = brands.find((element) => element.ID_MARCA === brandId);

  const [brand, setBrand] = useState(selectedBrand);

  const cancelModal = () => {
    dispatch(actions.hideModalEditBrand());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModalEditBrand());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setBrand({
      ...brand,
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
            value={brand.NOMBRE}
            onChange={handleChange}
            placeholder={selectedBrand.NOMBRE}
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
