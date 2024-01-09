import { useState } from "react";
import styles from "./productForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function ProductForm() {
  const products = useSelector((state) => state.products);
  const productId = useSelector((state) => state.productId);
  const dispatch = useDispatch();
  const selectedProduct = products.find((element) => element.id === productId);

  const [product, setProduct] = useState(products);

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editProduct(products));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    const editedProduct = products.map((element) => {
      if (element.id === productId) {
        element[target] = value;
      }
      return element;
    });

    setProduct({ editedProduct });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Code</label>
          <input
            autoComplete="off"
            name="code"
            value={selectedProduct.code}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="name"
            value={selectedProduct.name}
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
          <label>Proveedor</label>
          <input
            autoComplete="off"
            name="id_proveedor"
            value={selectedProduct.id_proveedor}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Stock</label>
          <input
            autoComplete="off"
            name="stock"
            value={selectedProduct.stock}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Precio</label>
          <input
            autoComplete="off"
            name="price"
            value={selectedProduct.price}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Unidad Medida</label>
          <input
            autoComplete="off"
            name="unidad_medida"
            value={selectedProduct.unidad_medida}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Min</label>
          <input
            autoComplete="off"
            name="cant_min"
            value={selectedProduct.cant_min}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Max</label>
          <input
            autoComplete="off"
            name="cant_max"
            value={selectedProduct.cant_max}
            onChange={handleChange}
            type="text"
          />
        </div>
        <div class="modal-footer">
          <Button variant="danger" onClick={closeModal}>
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
