import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import Dropdown from "../../../dropdown/dropdownSupplier";
import DropdownMesures from "../../../dropdown/dropdownMesure";
import DropdownBrands from "../../../dropdown/dropdownBrand";
import axios from "axios";
import { backURL } from "../../../../App";

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const mesures = useSelector((state) => state.mesures);
  const suppliers = useSelector((state) => state.suppliers);
  const [newProduct, setNewProduct] = useState({
    NOMBRE: null,
    CODIGO: null,
    ID_UNIDAD_MEDIDA: null,
    CANT_MIN: null,
    CANT_MAX: null,
    ID_PROVEEDOR: null,
    ID_MARCA: null,
    PRECIO_VENTA: null,
  });

  async function postProduct(product) {
    try {
      await axios.post(`${backURL}/producto/nuevo`, product)
    } catch (error) {
      console.log(error);
    }
  }

  const closeCreateModal = (event) => {
    event.preventDefault();
    postProduct({ Producto: newProduct })
    dispatch(actions.cleanProducts());
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  const handleSupplierSelect = (selectedSupplier) => {
    if (selectedSupplier && selectedSupplier !== "Desconocido") {
      const supplierId = suppliers.find(
        (e) => e.RAZON_SOCIAL === selectedSupplier
      ).ID_PROVEEDOR;
      setNewProduct({
        ...newProduct,
        ID_PROVEEDOR: supplierId,
      });
    } else {
      setNewProduct({
        ...newProduct,
        ID_PROVEEDOR: null,
      });
    }
  };

  const handleBrandSelect = (selectedBrand) => {
    if (selectedBrand && selectedBrand !== 'Otro') {
      const brandId = brands.find((e) => e.NOMBRE === selectedBrand).ID_MARCA;
      setNewProduct({
        ...newProduct,
        ID_MARCA: brandId,
      });
    } else {
      setNewProduct({
        ...newProduct,
        ID_MARCA: null,
      });
    }
  };

  const handleMesureSelect = (selectedMesure) => {
    const mesureId = mesures.find(
      (e) => e.NOMBRE === selectedMesure
    ).ID_UNIDAD_MEDIDA;
    setNewProduct({
      ...newProduct,
      ID_UNIDAD_MEDIDA: mesureId,
    });
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewProduct({
      ...newProduct,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>*Codigo</label>
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
          <label>*Nombre</label>
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
          <label>*Precio</label>
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
          <DropdownMesures onSelect={handleMesureSelect} />
        </div>
        <div
          className={styles.divs}
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
          <DropdownBrands onSelect={handleBrandSelect}></DropdownBrands>
        </div>
        <div
          className={styles.divs}
          style={{ textAlign: "center", verticalAlign: "middle" }}
        >
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
