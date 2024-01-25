import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownMesures from '../../../dropdown/dropdownMesure';

export default function ProductForm() {
  const products = useSelector((state) => state.products);
  const productId = useSelector((state) => state.productId);
  const dispatch = useDispatch();
  const selectedProduct = products.find((element) => element.id === productId);
  const [product, setProduct] = useState(selectedProduct || {});

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editProduct(product));
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
          <label>Code</label>
          <input
            autoComplete="off"
            name="code"
            value={product.code}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="name"
            value={product.name}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Marca</label>
          <input
            autoComplete="off"
            name="marca"
            value={selectedProduct.marca}
            onChange={handleChange}
            type="text"
          />
        </div>

        <div className={styles.divs}>
          <label>Stock</label>
          <input
            autoComplete="off"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Precio</label>
          <input
            autoComplete="off"
            name="price"
            value={product.price}
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
            name="cant_min"
            value={product.cant_min}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Max</label>
          <input
            autoComplete="off"
            name="cant_max"
            value={product.cant_max}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <div className={styles.container}>
            <DropdownSupplier onSelect={handleSupplierSelect} />
          </div>
        </div>
        <div class="modal-footer">
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
