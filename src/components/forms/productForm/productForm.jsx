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

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(actions.editProduct(products));
  }

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
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder={selectedProduct.name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Marca</label>
          <input
            autoComplete="off"
            name="marca"
            value={product.marca}
            onChange={handleChange}
            placeholder={selectedProduct.marca}
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
            placeholder={selectedProduct.stock}
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
            placeholder={selectedProduct.price}
            type="text"
          />
        </div>

        <Button variant="info" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  );
}
