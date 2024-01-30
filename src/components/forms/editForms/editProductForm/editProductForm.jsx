import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownMesures from "../../../dropdown/dropdownMesure";

export default function ProductForm() {
  const products = useSelector((state) => state.products);
  const productId = useSelector((state) => state.productId);
  const dispatch = useDispatch();
  const selectedProduct = products.find(
    (element) => element.ID_PRODUCTO === productId
  );
  const [product, setProduct] = useState(selectedProduct || {});

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const editProduct = async (data) => {
    const response = await axios.update('http://localhost:4000/producto/update', data)
    console.log(response);  
  };

  const closeModal = (event) => {
    event.preventDefault();
    editProduct(product)
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setProduct({
      ...product,
      [target]: value,
    });
  }

  const handleMesureSelect = (selectedDeposit) => {
    setProduct({
      ...product,
      mesure: selectedDeposit,
    });
  };

  const handleSupplierSelect = (selectedSupplier) => {
    setProduct({
      ...product,
      supplier: selectedSupplier,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Codigo</label>
          <input
            autoComplete="off"
            name="CODIGO"
            value={product.CODIGO || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={product.NOMBRE || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Marca</label>
          <input
            autoComplete="off"
            name="MARCA"
            value={product.MARCA || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Precio</label>
          <input
            autoComplete="off"
            name="PRECIO_VENTA"
            value={product.PRECIO_VENTA || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Unidad medida</label>
          <DropdownMesures onSelect={handleMesureSelect} />
        </div>
        <div className={styles.divs}>
          <label>Cant Min</label>
          <input
            autoComplete="off"
            name="CANT_MIN"
            value={product.CANT_MIN || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Max</label>
          <input
            autoComplete="off"
            name="CANT_MAX"
            value={product.CANT_MAX || ""}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <div className={styles.container}>
            <DropdownSupplier onSelect={handleSupplierSelect} />
          </div>
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
