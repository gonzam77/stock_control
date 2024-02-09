import { useEffect, useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DropdownPayType from "../../../dropdown/dropdownPayType";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const payType = useSelector(state => state.payType);
  let code = '';

  const [newOffer, setNewOffer] = useState({
    ID_PRODUCTO: "",
    PORCENTAJE_DESCUENTO: "",
    FECHA_INICIO: "",
    FECHA_FIN: '',
    TIPO_PAGO: '',
  });

  useEffect(() => {
    
  }, []);

  const closeCreateModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChangeCode(event){
    const productInOffer = products.find(e => e.CODIGO === event.target.value).ID_PRODUCTO;
    if(productInOffer)
    setNewOffer({
      ...newOffer,
      ID_PRODUCTO: productInOffer,
    });
  };

  function handleSelectPayType(eventKey){
    const selectedPayType = payType.find(e => e.NOMBRE === eventKey).ID_TIPO_PAGO
    setNewOffer({
      ...newOffer,
      ID_TIPO_PAGO: selectedPayType
    })
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    if (target !== "FECHA_FIN" && target !== "FECHA_INICIO") {
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
            value={code}
            onChange={handleChangeCode}
            placeholder="(0001)"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descuento</label>
          <input
            autoComplete="off"
            name="PORCENTAJE_DESCUENTO"
            value={newOffer.PORCENTAJE_DESCUENTO}
            onChange={handleChange}
            placeholder="Ejemplo...20"
            type="number"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Desde</label>
          <input
            autoComplete="off"
            name="FECHA_INICIO"
            value={newOffer.FECHA_INICIO ? newOffer.FECHA_INICIO.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="FECHA_FIN"
            value={newOffer.FECHA_FIN ? newOffer.FECHA_FIN.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <DropdownPayType onSelect={handleSelectPayType}></DropdownPayType>
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
