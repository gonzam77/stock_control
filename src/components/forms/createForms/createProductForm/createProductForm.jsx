import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import Dropdown from "../../../dropdown/dropdownSupplier";
import DropdownMesures from "../../../dropdown/dropdownMesure";
import DropdownBrands from "../../../dropdown/dropdownBrand";
import DropdownCategory from '../../../dropdown/dropdownCategory';
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

function validate(newProduct) {
  if (newProduct.CODIGO === '' || newProduct.CODIGO === null || newProduct.CODIGO.length < 4)
    return 'Codigo Incorrecto'
  if (newProduct.NOMBRE === '' || newProduct.NOMBRE === null || newProduct.NOMBRE.length < 4)
    return 'Nombre Incorrecto'
  if (isNaN(newProduct.CANT_MIN))
    return 'Cantidad Minima Incorrecta'
  if (newProduct.ID_CATEGORIA === '' || newProduct.ID_CATEGORIA === null || isNaN(newProduct.ID_CATEGORIA))
    return 'Categoria Maxima Incorrecta'
  if (isNaN(newProduct.CANT_MAX))
    return 'Cantidad Incorrecta'
  if (newProduct.ID_UNIDAD_MEDIDA === '' || newProduct.ID_UNIDAD_MEDIDA === null || isNaN(newProduct.ID_UNIDAD_MEDIDA))
    return 'Unidade de Medida Incorrecta'
  if (newProduct.ID_PROVEEDOR === '' || newProduct.ID_PROVEEDOR === null || isNaN(newProduct.ID_PROVEEDOR))
    return 'Proveedor Incorrecto'
  if (newProduct.ID_MARCA === '' || newProduct.ID_MARCA === null || isNaN(newProduct.ID_MARCA))
    return 'Marca Incorrecta'
  if (newProduct.PRECIO_VENTA === '' || newProduct.PRECIO_VENTA === null || isNaN(newProduct.PRECIO_VENTA))
    return 'Precio de venta Incorrecta'
  return false
};

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  const mesures = useSelector((state) => state.mesures);
  const categories = useSelector((state) => state.categories);
  const suppliers = useSelector((state) => state.suppliers);
  const [newProduct, setNewProduct] = useState({
    NOMBRE: '',
    CODIGO: '',
    ID_CATEGORIA: null,
    ID_UNIDAD_MEDIDA: null,
    CANT_MIN: 0,
    CANT_MAX: 0,
    ID_PROVEEDOR:null,
    ID_MARCA: null,
    PRECIO_VENTA: 0
  });

  async function postProduct(product) {
    try {
      await axios.post(`${backURL}/producto/nuevo`, product, axiosConfig)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.log(error);
    }
  }

 

  const closeCreateModal = async (event) => {
    event.preventDefault();
    const message = validate(newProduct)
    if (message === false) {
      await postProduct({ Producto: newProduct })
      dispatch(actions.cleanProducts());
      dispatch(actions.hideCreateModal());
    } else {
      Swal.fire({
        title: 'Error!',
        text: message,
        icon: 'error',
        confirmButtonText: 'Confirmar'
      })
    }
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

  const handleCategorySelect = (selectedCategory) => {
    if (selectedCategory && selectedCategory !== 'Otro') {
      const categoryId = categories.find((e) => e.NOMBRE === selectedCategory).ID_CATEGORIA;
      setNewProduct({
        ...newProduct,
        ID_CATEGORIA: categoryId,
      });
    } else {
      setNewProduct({
        ...newProduct,
        ID_CATEGORIA: null,
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
          <DropdownCategory onSelect={handleCategorySelect} />
        </div>
        <div className={styles.divs}>
          <DropdownMesures onSelect={handleMesureSelect} />
        </div>
        <div className={styles.divs}>
          <DropdownBrands onSelect={handleBrandSelect} />
        </div>
        <div className={styles.divs}>
          <Dropdown onSelect={handleSupplierSelect} />
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
