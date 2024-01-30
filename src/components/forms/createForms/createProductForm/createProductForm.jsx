import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import Dropdown from '../../../dropdown/dropdownSupplier';
import DropdownMesures from "../../../dropdown/dropdownMesure";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const [newProduct, setNewProduct] = useState({
    ID_PRODUCTO: '',
    NOMBRE: "",
    CODIGO: "",
    FECHA_CADUCIDAD: "",
    UNIDAD_MEDIDA: "",
    CANT_MIN: "",
    CANT_MAX: "",
    PROVEEDOR: "",
    MARCA: "",
    STOCK: "",
    PRECIO_VENTA: "",
  });


  const handleSupplierSelect = (selectedSupplier) => {
    setNewProduct({
      ...newProduct,
      PROVEEDOR: selectedSupplier,
    });
  };

  const closeCreateModal = (event) => {
    event.preventDefault();
    setNewProduct({
      ...newProduct,
    })
    dispatch(actions.createProduct(newProduct));
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }

  const handleMesureSelect = (selectedDeposit) => {
    setNewProduct({
      ...newProduct,
      mesure: selectedDeposit,
    });
  };


  function handleChange(event) {

    const target = event.target.name;
    const value = event.target.value;
    if (target !== "UNIDAD_MEDIDA" && target !== 'category') {
      setNewProduct({
        ...newProduct,
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
            name="CODIGO"
            value={newProduct.CODIGO}
            onChange={handleChange}
            placeholder="(0001)"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={newProduct.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Marca</label>
          <input
            autoComplete="off"
            name="MARCA"
            value={newProduct.MARCA}
            onChange={handleChange}
            placeholder="MARCA..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Unidad medida</label>
          <DropdownMesures onSelect={handleMesureSelect}/>
        </div>
        <div className={styles.divs}>
          <label>Stock</label>
          <input
            autoComplete="off"
            name="STOCK"
            value={newProduct.STOCK}
            onChange={handleChange}
            placeholder="Stock..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant min</label>
          <input
            autoComplete="off"
            name="CANT_MIN"
            value={newProduct.CANT_MIN}
            onChange={handleChange}
            placeholder="Cant min necesaria"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Max</label>
          <input
            autoComplete="off"
            name="CANT_MAX"
            value={newProduct.CANT_MAX}
            onChange={handleChange}
            placeholder="Cant max deseable"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Precio</label>
          <input
            autoComplete="off"
            name="PRECIO_VENTA"
            value={newProduct.PRECIO_VENTA}
            onChange={handleChange}
            placeholder="Precio..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Facha de vencimiento</label>
          <input
            autoComplete="off"
            name="FECHA_CADUCIDAD"
            value={newProduct.FECHA_CADUCIDAD}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div style={{textAlign: 'center', verticalAlign: 'middle'}}>
          <Dropdown onSelect={handleSupplierSelect}></Dropdown>
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
