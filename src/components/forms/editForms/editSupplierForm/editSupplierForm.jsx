import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownAccount from "../../../dropdown/dropdownAccount";
import DropdownUbication from '../../../dropdown/dropdownUbication';

export default function SupplierForm() {

  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers);
  const supplierId = useSelector((state) => state.supplierId);
  const ubicaciones = useSelector(state => state.ubicaciones)
  const accounts = useSelector(state => state.accounts)

  const selectedSupplier = suppliers.find(
    (element) => element.id === supplierId
  );

  const [supplier, setSupplier] = useState(selectedSupplier);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editSupplier(supplier))
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setSupplier({
      ...supplier,
      [target]: value
    })
  };

  const handleUbicationSelect = (selectedUbication) => {
    const ubicacionId = ubicaciones.find(e => e.DIRECCION === selectedUbication).ID_UBICACION
    setSupplier({
      ...supplier,
      ID_UBICACION: ubicacionId,
    });
  };

  const handleaccountselect = (selectedAcount) => {
    const acountId = accounts.find(e => e.DESCRIPCION === selectedAcount).ID_CUENTA
    setSupplier({
      ...supplier,
      ID_CUENTA: acountId,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="RAZON_SOCIAL"
            value={supplier.RAZON_SOCIAL}
            onChange={handleChange}
            placeholder={selectedSupplier.RAZON_SOCIAL}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="CUIL"
            value={supplier.CUIL}
            onChange={handleChange}
            placeholder={selectedSupplier.CUIL}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="EMAIL"
            value={supplier.EMAIL}
            onChange={handleChange}
            placeholder={selectedSupplier.EMAIL}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="TELEFONO"
            value={supplier.TELEFONO}
            onChange={handleChange}
            placeholder={selectedSupplier.TELEFONO}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownUbication onSelect={handleUbicationSelect}></DropdownUbication>
        </div>
        <div className={styles.divs}>
          <DropdownAccount onSelect={handleaccountselect}></DropdownAccount>
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
