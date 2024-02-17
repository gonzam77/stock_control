import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownClient from "../../../dropdown/dropdownClient";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";
import Swal from 'sweetalert2'


export default function NewSaleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const sales = useSelector((state) => state.sales);
  const offers = useSelector((state) => state.offers);
  const deposits = useSelector((state) => state.deposits);
  const brands = useSelector((state) => state.brands);
  const clients = useSelector((state) => state.clients);
  const payTypes = useSelector((state) => state.payTypes);
  const [update, setUpdate] = useState();
  const [cart, setCart] = useState([]);

  const [newSale, setNewSale] = useState({
    CODIGO: "",
    NUMERO: "",
    items: [],
    CANTIDAD: 0,
    ID_BODEGA: "",
    MONTO: [],
    TIPO_PAGO: "",
    TOTAL: "",
    CLIENTE: "",
  });
  
  const [newItem, setNewItem] = useState({
    CODIGO: "",
    NOMBRE: "",
    CANTIDAD: "",
    MONTO_TOTAL: "",
  });


  useEffect(() => {
    if (!products.length) dispatch(actions.getAllProducts());
    if (!offers.length) dispatch(actions.getAllOffers());
    if (!payTypes.length) dispatch(actions.getAllPayTypes());
    if (!clients.length) dispatch(actions.getAllClients());
    if (!brands.length) dispatch(actions.getAllBrands());
    if (!deposits.length) dispatch(actions.getAllDeposits());
  }, [products, offers, dispatch, payTypes, clients, brands, deposits])

  function getLastSale() {
    let lastSale = 0;
    if (sales.length >= 1) {
      for (let i = 0; i < sales.length; i++) {
        if (sales[i].NUMERO > lastSale) lastSale = sales[i].NUMERO;
      }
      lastSale = parseInt(lastSale, 10);
      return lastSale;
    }
  }

  const handleAdd = () => {
    let finalPrice = null;
    let offerProduct = null;
    let sumProduct = null;
    const lastSale = getLastSale();
    const selectedProduct = products.find(e => e.CODIGO === newItem?.CODIGO.toUpperCase());

    if (!selectedProduct) {
      Swal.fire({
        title: 'Error!',
        text: 'Producto no encontrado!',
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
    } else {

      const newTotal = newSale.TOTAL + selectedProduct?.CANTIDAD * finalPrice;

      //comprueba que la cantidad no sea nula
      if (!newItem.CANTIDAD || newItem.CANTIDAD === "" || newItem.CANTIDAD < 1)
        newItem.CANTIDAD = 1;
      else newItem.CANTIDAD = parseInt(newItem.CANTIDAD);

      //busca si el producto esta en oferta y calcula el precio final
      offerProduct = offers.find((e) => e.ID_PRODUCTO === newItem.CODIGO);
      if (offerProduct) {
        const discount = parseFloat(offerProduct.PORCENTAJE_DESCUENTO)
        finalPrice = (1 - discount / 100) * selectedProduct.PRECIO_VENTA;
      }
      else { finalPrice = selectedProduct?.PRECIO_VENTA; }

      //comprueba si el producto esta en el carro para sumar cantidad y cambiar el precio acumulado
      if (selectedProduct) {
        if (cart.length) sumProduct = cart.find(element => element.CODIGO === selectedProduct.CODIGO);
        if (sumProduct) {
          sumProduct["CANTIDAD"] += newItem.CANTIDAD;
          sumProduct["MONTO_TOTAL"] = selectedProduct.CANTIDAD * finalPrice;
          setUpdate(!update);
        } else {
          selectedProduct["CANTIDAD"] = newItem.CANTIDAD;
          selectedProduct["MONTO_TOTAL"] = selectedProduct?.CANTIDAD * finalPrice;
          setCart([...cart, selectedProduct]);
          setUpdate(!update);
        }
      };

      setNewSale({
        ...newSale,
        NUMERO: lastSale + 1,
        CANTIDAD: (newSale.CANTIDAD += selectedProduct?.CANTIDAD),
        TOTAL: parseFloat(newTotal).toFixed(2), // Update the TOTAL field
      });

      setNewItem({
        CODIGO: "",
        NOMBRE: "",
        CANTIDAD: "",
      });
    }
  };

  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
      const carroActualizado = [...cart];
      carroActualizado[index].MONTO_TOTAL =
        carroActualizado[index].MONTO_TOTAL / carroActualizado[index].CANTIDAD;
      carroActualizado[index].CANTIDAD = nuevaCantidad;
      carroActualizado[index].MONTO_TOTAL *= nuevaCantidad;

      setCart(carroActualizado);
      setUpdate(!update);
      const newTotal = cart.reduce((total, item) => total + item.CANTIDAD * item.PRECIO_VENTA, 0);

      setNewSale({
        ...newSale,
        TOTAL: parseFloat(newTotal).toFixed(2),
      })
    }
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleAdd();
  //   }
  // };

  const deleteProduct = (CODIGO) => {
    if (CODIGO) {
      const index = cart.findIndex((e) => e.CODIGO === CODIGO);
      cart.splice(index, 1);
      setUpdate(!update);
    }
  };

  const handlePayTypeSelect = (selectedPayType) => {
    const payTypeId = payTypes?.find(e => e.NOMBRE === selectedPayType).ID_FORMA_PAGO
    setNewSale({
      ...newSale,
      ID_FORMA_PAGO: payTypeId,
    });
  };

  const handleClientSelect = (selectedClient) => {
    const clientId = clients?.find(e => e.CUIL === selectedClient).ID_CLIENTE
    setNewSale({
      ...newSale,
      CLIENTE: clientId,
    });
  };

  const handleDepositSelect = (selectedDeposit) => {
    const depositId = deposits.find(e => e.NOMBRE === selectedDeposit).ID_BODEGA
    setNewSale({
      ...newSale,
      ID_BODEGA: depositId,
    });
  };

  const confirmSale = (event) => {
    event.preventDefault();
    dispatch(actions.newSale(newSale));
    navigate("/");
  };

  const cancelSale = () => {
    navigate("/");
  };

  function handleChange(event) {
    const target = event.target.name;
    let value = event.target.value;
    setNewItem({
      ...newItem,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <h2>NUEVA VENTA</h2>
      <form className={styles.form}>
        <div className={styles.divs}>
          <div className={styles.dropdown}>
            <label htmlFor="">Cliente</label>
            <DropdownClient onSelect={handleClientSelect} />
            <label htmlFor="">Deposito</label>
            <DropdownDeposit onSelect={handleDepositSelect} />
            <label htmlFor="">Forma de pago</label>
            <DropdownPayType onSelect={handlePayTypeSelect} />
          </div>
        </div>
        <div className={styles.divs}>
          <div className={styles.subDivs}>
            <div className={styles.divs}>
              <label>Codigo</label>
              <input
               // onKeyDown={handleKeyDown}
                className={styles.CODIGO}
                autoComplete="off"
                name="CODIGO"
                value={newItem.CODIGO}
                onChange={handleChange}
                placeholder="Codigo..."
                type="text"
              />
            </div>
            <div className={styles.divs}>
              <label>Cantidad</label>
              <input
                //onKeyDown={handleKeyDown}
                autoComplete="off"
                name="CANTIDAD"
                value={newItem.CANTIDAD}
                onChange={handleChange}
                placeholder="Cantidad..."
                type="number"
              />
            </div>
            <Button onClick={handleAdd}>Agregar</Button>
          </div>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Marca</th>
                <th>Precio U.</th>
                <th>Precio T.</th>
                <th>Eliminar</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {
                cart.map((item, index) => {
                  const brand = brands?.find(e => e.ID_MARCA === item.ID_MARCA)
                  return (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td>
                        <div>
                          <input
                            autoComplete="off"
                            name="CANTIDAD"
                            value={item.CANTIDAD}
                            onChange={(e) => handleCantidadChange(e, index)}
                            type="number"
                          />
                        </div>
                      </td>
                      <td>{item.CODIGO}</td>
                      <td>{item.NOMBRE}</td>
                      <td>{brand.NOMBRE}</td>
                      <td>
                        {"$ "}
                        {item.PRECIO_VENTA}
                      </td>
                      <td>
                        {"$ "}
                        {item.MONTO_TOTAL.toFixed(2)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteProduct(item.CODIGO);
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                      <td>{item.stock}</td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <b>
                    {"$ "}
                    {newSale.TOTAL}
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="modal-footer">
          <div className={styles.buttons}>
            <Button variant="danger" onClick={cancelSale}>
              Cancelar
            </Button>
            <Button variant="success" onClick={confirmSale}>
              Confirmar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
