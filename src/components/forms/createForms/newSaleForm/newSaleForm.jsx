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
  const [newSale, setNewSale] = useState({
    code:'',
    number: "",
    items: [],
    quantity: 0,
    deposit: "",
    mount: [],
    payType: "",
    total: "",
    client: "",
  });

  function getLastSale() {
    let lastSale = sales[0].number;
    for (let i = 0; i < sales.length; i++) {
      if (sales[i].number > lastSale) lastSale = sales[i].number;
    }
    lastSale = parseInt(lastSale, 10);
    return lastSale;
  }

  const [cart, setCart] = useState([]);

  const [update, setUpdate] = useState();

  const [newItem, setNewItem] = useState({
    code: "",
    number: "",
    name: "",
    quantity: "",
    price: "",
    deposit: "",
    payType: "",
    total: "",
    client: "",
    totalMount: "",
  });

  useEffect(() => {
    setNewSale({
      ...newSale,
      items: cart,
      mount: cart.reduce((acc, current) => acc + current.totalMount, 0),
    });
  }, [cart, update]);

  const handleAdd = () => {
    if (!newItem.quantity || newItem.quantity === "" || newItem.quantity < 1)
      newItem.quantity = 1;
    const quantity = parseInt(newItem.quantity);
    newItem.quantity = quantity;
    const lastSale = getLastSale();
    if (newItem.code.length > 3) {
      offerProduct = offers.find((e) => e.code === newItem.code);
      product = products.find((element) => element.code === newItem.code);
      if (offerProduct)
        finalPrice = (1 - offerProduct.discount / 100) * product.price;
      else finalPrice = product.price;
    }

    if (product) {
      const selectedProduct = cart.find(
        (element) => element.code === product.code
      );
      if (selectedProduct) {
        product["quantity"] += newItem.quantity;
        product["totalMount"] = product.quantity * finalPrice;
        setUpdate(!update);
      } else {
        product["quantity"] = newItem.quantity;
        product["totalMount"] = product.quantity * finalPrice;
        setCart([...cart, product]);
      }

      setNewSale({
        ...newSale,
        number: lastSale + 1,
        quantity: (newSale.quantity += product.quantity),
      });

      setNewItem({
        code: "",
        name: "",
        quantity: "",
      });
    }
  };

  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
      const carroActualizado = [...cart];
      carroActualizado[index].totalMount =
        carroActualizado[index].totalMount / carroActualizado[index].quantity;
      carroActualizado[index].quantity = nuevaCantidad;
      carroActualizado[index].totalMount *= nuevaCantidad;

      setCart(carroActualizado);
      setUpdate(!update);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const deleteProduct = (code) => {
    if (code) {
      const index = cart.findIndex((e) => e.code === code);
      cart.splice(index, 1);
      setUpdate(!update);
    }
  };

  const handlePayTypeSelect = (selectedPayType) => {
    setNewSale({
      ...newSale,
      payType: selectedPayType,
    });
  };

  const handleClientSelect = (selectedClient) => {
    setNewSale({
      ...newSale,
      client: selectedClient,
    });
  };

  const handleDepositSelect = (selectedDeposit) => {
    setNewSale({
      ...newSale,
      deposit: selectedDeposit,
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
          <div className={styles.subDivs}>
            <div className={styles.divs}>
              <label>Codigo</label>
              <input
                onKeyDown={handleKeyDown}
                className={styles.code}
                autoComplete="off"
                name="code"
                value={newItem.code}
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
                name="quantity"
                value={newItem.quantity}
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
                <th>brand</th>
                <th>Precio U.</th>
                <th>Precio T.</th>
                <th>Eliminar</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {newSale.items[0] &&
                newSale.items.map((item, index) => {
                  return (
                    <tr key={index} style={{ textAlign: "center" }}>
                      <td>
                        <div>
                          <input
                            autoComplete="off"
                            name="quantity"
                            value={item.quantity}
                            onChange={(e) => handleCantidadChange(e, index)}
                            type="number"
                          />
                        </div>
                      </td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{item.brand}</td>
                      <td>
                        {"$ "}
                        {item.price}
                      </td>
                      <td>
                        {"$ "}
                        {item.totalMount}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteProduct(item.code);
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
                    {newSale.mount}
                  </b>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className={styles.divs}>
          <div className={styles.dropdown}>
            <label htmlFor="">Forma de pago</label>
            <DropdownPayType onSelect={handlePayTypeSelect} />
            <label htmlFor="">Cliente</label>
            <DropdownClient onSelect={handleClientSelect} />
            <label htmlFor="">Deposito</label>
            <DropdownDeposit onSelect={handleDepositSelect} />
          </div>
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
