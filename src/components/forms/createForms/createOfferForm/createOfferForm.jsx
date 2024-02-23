import { useEffect, useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import DropdownBrands from "../../../dropdown/dropdownBrand";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import { ReactSearchAutocomplete } from 'react-search-autocomplete'

export default function CreateProductForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const brands = useSelector((state) => state.brands);
  const payTypes = useSelector(state => state.payTypes);

  const [itemSelected, setItemSelected] = useState({
    id: ''
  })

  const [newOffer, setNewOffer] = useState({
    ID_PRODUCTO: '',
    NOMBRE: '',
    DESCRIPCION: '',
    PORCENTAJE_DESCUENTO: "",
    FECHA_INICIO: "",
    FECHA_FIN: '',
    ID_FORMA_PAGO: '',
    CLIENTE: 0,
    COMPATIBLE: 0,
    UNUDAD: 'U'
  });

  const items = products?.map(e => ({
    id: e.ID_PRODUCTO,
    name: e.NOMBRE,
  }))
  
  
  useEffect(() => {
    if (!products.length) dispatch(actions.getAllProducts());
    if (!payTypes.length) dispatch(actions.getAllPayTypes());
    if (!brands.length) dispatch(actions.getAllBrands());
  }, [payTypes, products, dispatch, brands]);
  
  async function postOffer(descuento) {
    console.log('descuento', descuento);
    try {
      await axios.post(`${backURL}/descuento/nuevo`, descuento, axiosConfig)
    } catch (error) {
      console.log(error);
    };
  };

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postOffer({ Descuento: newOffer })
    dispatch(actions.cleanOffers());
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    // the item hovered
    console.log(result)
  }

  const handleOnSelect = (item) => {
    setItemSelected({
      id: item.id
    })
  }

  const handleOnFocus = () => {
    console.log('Focused')
  }

  const formatResult = (item) => {
    return (
      <>
        {/* <span style={{ display: 'block', textAlign: 'left' }}>id: {item.id}</span> */}
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }



  function handleSelectBrand(eventKey) {
    const selectedBrand = brands.find(e => e.NOMBRE === eventKey)
    const selectedProduct = products.find(e => e.ID_PRODUCTO === itemSelected.id && e.ID_MARCA === selectedBrand.ID_MARCA);
    if (selectedProduct) {
      setNewOffer({
        ID_PRODUCTO: selectedProduct.ID_PRODUCTO
      })
    }
  };

  function handleSelectPayType(eventKey) {
    const selectedPayType = payTypes.find(e => e.NOMBRE === eventKey)
    if (selectedPayType) {
      setNewOffer({
        ...newOffer,
        ID_FORMA_PAGO: selectedPayType.ID_FORMA_PAGO
      })
    }
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    if (target !== "FECHA_FIN" && target !== "FECHA_INICIO") {
      setNewOffer({
        ...newOffer,
        [target]: value,
      });
    } else {
      const formattedDate = value ? `${value}T00:00:00` : null;
      setNewOffer({
        ...newOffer,
        [target]: formattedDate ? new Date(formattedDate) : null,
      });
    }
  }


  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div style={{ width: 450 }}>
          <ReactSearchAutocomplete
            items={items}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
        <br></br>
        <div className={styles.divs}>
          <DropdownBrands onSelect={handleSelectBrand}></DropdownBrands>
        </div>
        <div className={styles.divs}>
          <DropdownPayType onSelect={handleSelectPayType}></DropdownPayType>
        </div>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={newOffer.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descripcion</label>
          <input
            autoComplete="off"
            name="DESCRIPCION"
            value={newOffer.DESCRIPCION}
            onChange={handleChange}
            placeholder="Descripcion..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Descuento %</label>
          <input
            autoComplete="off"
            name="PORCENTAJE_DESCUENTO"
            value={newOffer.PORCENTAJE_DESCUENTO}
            onChange={handleChange}
            placeholder="Ejemplo...20"
            type="number"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Desde</label>
          <input
            autoComplete="off"
            name="FECHA_INICIO"
            value={newOffer.FECHA_INICIO ? newOffer.FECHA_INICIO.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Fecha Hasta</label>
          <input
            autoComplete="off"
            name="FECHA_FIN"
            value={newOffer.FECHA_FIN ? newOffer.FECHA_FIN.toISOString().split('T')[0] : ''}
            onChange={handleChange}
            type="date"
          />
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
