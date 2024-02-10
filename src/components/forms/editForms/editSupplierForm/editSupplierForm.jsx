import { useEffect, useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownAccount from "../../../dropdown/dropdownAccount";
import DropdownUbication from '../../../dropdown/dropdownUbication';
import axios from "axios";
import { backURL } from "../../../../App";

export default function SupplierForm() {

  const dispatch = useDispatch();
  const suppliers = useSelector((state) => state.suppliers);
  const supplierId = useSelector((state) => state.supplierId);
  const ubications = useSelector(state => state.ubications)
  const accounts = useSelector(state => state.accounts)

  const selectedSupplier = suppliers.find(
    (element) => element.ID_PROVEEDOR === supplierId
  );

  const [supplier, setSupplier] = useState(selectedSupplier);


    useEffect(()=>{
      if(!ubications.length)dispatch(actions.getAllUbications());
      if(!suppliers.length)dispatch(actions.getAllSuppliers());
      if(!accounts.length)dispatch(actions.getAllAccounts());
    },[ubications, dispatch, suppliers, accounts])

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }

  async function putSupplier(proveedor) {
    try {
      await axios.put(`${backURL}/proveedor/update`, proveedor)
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = async (event) => {
    event.preventDefault();
    await putSupplier({ Proveedor: supplier })
    dispatch(actions.cleanSuppliers());
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
    if (selectedUbication !== "Desconocido" && selectedUbication) {
      const ubicacionId = ubications.find(
        (e) => e.DIRECCION === selectedUbication
      ).ID_UBICACION;
      setSupplier({
        ...supplier,
        ID_UBICACION: ubicacionId,
      });
    } else {
      setSupplier({
        ...supplier,
        ID_UBICACION: null,
      });
    }
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
        <div className="modal-footer">
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
