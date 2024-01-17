import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";

export default function SupplierForm() {

  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers);
  const supplierId = useSelector((state) => state.supplierId);

  const selectedSupplier = suppliers.find(
    (element) => element.id === supplierId
  );

  const [supplier, setSupplier] = useState(selectedSupplier);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editProduct(supplier))
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setSupplier({
      ...supplier,
      [target]: value
    })

  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="razon_social"
            value={supplier.razon_social}
            onChange={handleChange}
            placeholder={selectedSupplier.razon_social}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={supplier.cuil}
            onChange={handleChange}
            placeholder={selectedSupplier.cuil}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="email"
            value={supplier.email}
            onChange={handleChange}
            placeholder={selectedSupplier.email}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={supplier.phone}
            onChange={handleChange}
            placeholder={selectedSupplier.phone}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={supplier.adress}
            onChange={handleChange}
            placeholder={selectedSupplier.adress}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={supplier.province}
            onChange={handleChange}
            placeholder={selectedSupplier.province}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={supplier.adress}
            onChange={handleChange}
            placeholder={selectedSupplier.state}
            type="text"
          />
        </div>
        <div class="modal-footer">
          <Button variant="danger" onClick={cancelModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeModal} >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
