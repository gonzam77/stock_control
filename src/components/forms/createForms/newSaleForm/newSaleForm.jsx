import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownClient from "../../../dropdown/dropdownClient";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";

export default function NewSaleForm() {
  let product = null;
  let offerProduct = null;
  let finalPrice = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const sales = useSelector((state) => state.sales);
  const offers = useSelector((state) => state.offers);
  const [update, setUpdate] = useState();
  const [cart, setCart] = useState([]);

  const [newSale, setNewSale] = useState({
    CODIGO: "",
    NUMERO: "",
    items: [],
    CANTIDAD: 0,
    DEPOSITO: "",
    MONTO: [],
    TIPO_PAGO: "",
    TOTAL: "",
    CLIENTE: "",
  });
  const [newItem, setNewItem] = useState({
    CODIGO: "",
    NOMBRE: "",
    CANTIDAD: "",
    PRECIO_VENTA: "",
    DEPOSITO: "",
    MONTO_TOTAL: "",
  });


  useEffect(() => {
    if (!products.length) dispatch(actions.getAllProducts());
    if (!offers.length) dispatch(actions.getAllOffers());
  }, [products, offers, dispatch])

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

    if (!newItem.CANTIDAD || newItem.CANTIDAD === "" || newItem.CANTIDAD < 1)
      newItem.CANTIDAD = 1;
    else newItem.CANTIDAD = parseInt(newItem.CANTIDAD);

    const lastSale = getLastSale();

    if (newItem.CODIGO.length > 3) {
      const selectedProduct = products.find(e => e.CODIGO === newItem.CODIGO)
      offerProduct = offers.find((e) => e.ID_PRODUCTO === selectedProduct.CODIGO);
      if (offerProduct) {
        const discount = parseFloat(offerProduct.DESCUENTO)
        finalPrice = (1 - discount / 100) * selectedProduct.PRECIO_VENTA;
      }
      else finalPrice = product.PRECIO_VENTA;
    }

    if (offerProduct) {
      const selectedProduct = cart.find(
        (element) => element.CODIGO === offerProduct.CODIGO
      );
      if (selectedProduct) {
        product["CANTIDAD"] += newItem.CANTIDAD;
        product["MONTO_TOTAL"] = offerProduct.CANTIDAD * finalPrice;
        setUpdate(!update);
      } else {
        product["CANTIDAD"] = newItem.CANTIDAD;
        product["MONTO_TOTAL"] = offerProduct.CANTIDAD * finalPrice;
        setCart([...cart, product]);
      }

      setNewSale({
        ...newSale,
        NUMERO: lastSale + 1,
        CANTIDAD: (newSale.CANTIDAD += offerProduct.CANTIDAD),
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
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const deleteProduct = (CODIGO) => {
    if (CODIGO) {
      const index = cart.findIndex((e) => e.CODIGO === CODIGO);
      cart.splice(index, 1);
      setUpdate(!update);
    }
  };

  const handlePayTypeSelect = (selectedPayType) => {
    setNewSale({
      ...newSale,
      TIPO_PAGO: selectedPayType,
    });
  };

  const handleClientSelect = (selectedClient) => {
    setNewSale({
      ...newSale,
      CLIENTE: selectedClient,
    });
  };

  const handleDepositSelect = (selectedDeposit) => {
    setNewSale({
      ...newSale,
      DEPOSITO: selectedDeposit,
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
                onKeyDown={handleKeyDown}
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
                onKeyDown={handleKeyDown}
                autoComplete="off"
                name="CANTIDAD"
                value={newItem.CANTIDAD}
                onChange={handleChange}
                placeholder="Cantidad..."
                type="NUMERO"
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
              {newSale.items[0] &&
                newSale.items?.map((item, index) => {
                  return (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td>
                        <div>
                          <input
                            autoComplete="off"
                            name="CANTIDAD"
                            value={item.CANTIDAD}
                            onChange={(e) => handleCantidadChange(e, index)}
                            type="NUMERO"
                          />
                        </div>
                      </td>
                      <td>{item.CODIGO}</td>
                      <td>{item.NOMBRE}</td>
                      <td>{item.brand}</td>
                      <td>
                        {"$ "}
                        {item.PRECIO_VENTA}
                      </td>
                      <td>
                        {"$ "}
                        {item.MONTO_TOTAL}
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
                    {newSale.MONTO}
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
