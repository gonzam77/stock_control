import { useState } from "react";
import styles from "./createProductForm.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function CreateProductForm() {
  const dispatch = useDispatch();

  const [newProduct, setNewProduct] = useState({
    name: "",
    code: "",
    fecha_vto: "",
    fecha_creacion: "",
    unidad_medida: "",
    cant_min: "",
    cant_max: "",
    proveedor: "",
    marca: "",
    stock: "",
    price: "",
  });

  const closeCreateModal = (event) => {
    event.preventDefault();
    dispatch(actions.createProduct(newProduct));
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    if (target !== "cuil" && target !== "unidad_medida") {
      setNewProduct({
        ...newProduct,
        [target]: value,
      });
    }
  }

  function handleSubmit(event) {
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.divs}>
          <label>Codigo</label>
          <input
            autoComplete="off"
            name="code"
            value={newProduct.code}
            onChange={handleChange}
            placeholder="(0001)"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
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
          <label>Marca</label>
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
          <label>Unidad medida</label>
          <input
            autoComplete="off"
            name="unidad_medida"
            value={newProduct.unidad_medida}
            onChange={handleChange}
            placeholder="Unidad/Litros..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Stock</label>
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
          <label>Cant min</label>
          <input
            autoComplete="off"
            name="cant_min"
            value={newProduct.cant_min}
            onChange={handleChange}
            placeholder="Cant min necesaria"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cant Max</label>
          <input
            autoComplete="off"
            name="cant_max"
            value={newProduct.cant_max}
            onChange={handleChange}
            placeholder="Cant max deseable"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil Proveedor</label>
          <input
            autoComplete="off"
            name="cuil"
            value={newProduct.cuil}
            onChange={handleChange}
            placeholder="cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Precio</label>
          <input
            autoComplete="off"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            placeholder="Precio..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Facha de vencimiento</label>
          <input
            autoComplete="off"
            name="fecha_vto"
            value={newProduct.fecha_vto}
            onChange={handleChange}
            type="date"
          />
        </div>

        <div className="modal-footer">
          <Button variant="danger" onClick={closeCreateModal}>
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
