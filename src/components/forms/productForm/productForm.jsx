import { useState } from "react";
import styles from "./productForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function ProductForm() {
  const products = useSelector((state) => state.products);
  console.log(products);
  const productId = useSelector((state) => state.productId);
  const dispatch = useDispatch();
  const selectedProduct = products.find((element) => element.id === productId);
  const backupProduct = products
  const [product, setProduct] = useState(selectedProduct || {} );
  
  
  const cancelModal =()=> {
    dispatch(actions.hideModal());
  }
  
  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editProduct(product))
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setProduct({
      ...product,
      [target]: value
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
          <label>Proveedor</label>
          <input
            autoComplete="off"
            name="id_proveedor"
            value={product.id_proveedor}
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
          <label>Unidad Medida</label>
          <input
            autoComplete="off"
            name="unidad_medida"
            value={product.unidad_medida}
            onChange={handleChange}
            type="text"
          />
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
