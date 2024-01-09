import { useState } from "react";
import styles from "./createProductForm.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function CreateProductForm() {
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    marca: "",
    stock: "",
    price: "",
  });

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    setNewProduct({
      ...newProduct,
      [target]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(actions.createProduct(newProduct));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.divs}>
          <input
            autoComplete="off"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <input
            autoComplete="off"
            name="marca"
            value={newProduct.marca}
            onChange={handleChange}
            placeholder="Marca..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <input
            autoComplete="off"
            name="stock"
            value={newProduct.stock}
            onChange={handleChange}
            placeholder="Stock..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <input
            autoComplete="off"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Precio..."
            type="text"
          />
        </div>

        <Button variant="dark" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  );
}
