import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import styles from "../createForms.module.css";
import DropdownAccount from "../../../dropdown/dropdownAccount";
import { axiosConfig, backURL } from "../../../../App";
import axios from "axios";
import Swal from 'sweetalert2';


export default function CreateProductForm() {
  const dispatch = useDispatch();
  const accounts = useSelector(state => state.accounts);
  const [newSupplier, setNewSupplier] = useState({
    ID_CUENTA: null,
    RAZON_SOCIAL: '',
    CUIL: '',
    EMAIL: '',
    TELEFONO: '',
  });


  async function postSupplier(proveedor) {
    try {
      await axios.post(`${backURL}/proveedor/nuevo`, proveedor, axiosConfig)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
    });
      console.log(error.response.data.Message);
    }
  }

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postSupplier({ Proveedor: newSupplier });
    dispatch(actions.cleanSuppliers());
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewSupplier({
      ...newSupplier,
      [target]: value,
    });
  };

  const handleAccountSelect = (selectedAcount) => {
    const acountId = accounts.find(e => e.DESCRIPCION === selectedAcount).ID_CUENTA
    setNewSupplier({
      ...newSupplier,
      ID_CUENTA: acountId,
    });
  };


  return (
    <div className=''>
      <form className=''>
        <div className={styles.divs}>
          <label>Razon Social</label>
          <input
            autoComplete="off"
            name="RAZON_SOCIAL"
            value={newSupplier.RAZON_SOCIAL}
            onChange={handleChange}
            placeholder="Razon Social..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="CUIL"
            value={newSupplier.CUIL}
            onChange={handleChange}
            placeholder="Cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="EMAIL"
            value={newSupplier.EMAIL}
            onChange={handleChange}
            placeholder="example@gmail.com"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="TELEFONO"
            value={newSupplier.TELEFONO}
            onChange={handleChange}
            placeholder="266..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownAccount onSelect={handleAccountSelect}></DropdownAccount>
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
