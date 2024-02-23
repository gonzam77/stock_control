import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownMesures from "../../../dropdown/dropdownMesure";
import DropdownBrands from "../../../dropdown/dropdownBrand";
import DropdownCategory from '../../../dropdown/dropdownCategory';
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function EditProductForm() {
  const products = useSelector((state) => state.products);
  const productId = useSelector((state) => state.productId);
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands);
  const categories = useSelector(state => state.categories);
  const mesures = useSelector(state => state.mesures);
  const suppliers = useSelector(state => state.suppliers);
  const selectedProduct = products.find(
    (element) => element.ID_PRODUCTO === productId
  );

  const [product, setProduct] = useState(selectedProduct || {});

  const closeModal = async (event) => {
    event.preventDefault();
    await editProduct({ Producto: product });
    dispatch(actions.cleanProducts());
    dispatch(actions.hideModal());
  };

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const editProduct = async (data) => {
    await axios.put(`${backURL}/producto/update`, data, axiosConfig);
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setProduct({
      ...product,
      [target]: value,
    });
  }

  const handleCategorySelect = (selectedCategory) => {
    const categoryId = categories.find(e => e.NOMBRE === selectedCategory).ID_CATEGORIA
    setProduct({
      ...product,
      ID_CATEGORIA: categoryId,
    });
  };
  const handleBrandSelect = (selectedBrand) => {
    const brandId = brands.find(e => e.NOMBRE === selectedBrand).ID_MARCA
    setProduct({
      ...product,
      ID_MARCA: brandId,
    });
  };

  const handleMesureSelect = (selectedMesure) => {
    const mesureId = mesures.find(e => e.NOMBRE === selectedMesure).ID_UNIDAD_MEDIDA
    setProduct({
      ...product,
      ID_UNIDAD_MEDIDA: mesureId,
    });
  };

  const handleSupplierSelect = (selectedSupplier) => {
    const supplierId = suppliers?.find(e => e.RAZON_SOCIAL === selectedSupplier).ID_PROVEEDOR
    setProduct({
      ...product,
      ID_PROVEEDOR: supplierId,
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
          <DropdownCategory onSelect={handleCategorySelect} />
        </div>
        <div className={styles.divs}>
          <DropdownMesures onSelect={handleMesureSelect} />
        </div>
        <div className={styles.divs} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <DropdownBrands onSelect={handleBrandSelect}></DropdownBrands>
        </div>
        <div className={styles.divs} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
          <DropdownSupplier onSelect={handleSupplierSelect}></DropdownSupplier>
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
