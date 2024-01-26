import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";

export default function NewSettingForm() {
  let product = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [newSetting, setNewSetting] = useState({
    id: "",
    number: "",
    date: "",
    items: [],
    quantity: 0,
    deposit: "",
    mount: [],
    payType: "",
    total: "",
    supplier: "",
    totalMount: "",
  });

  const [cart, setCart] = useState([]);

  const [update, setUpdate] = useState();

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
    price: "",
    totalMount: "",
  });

  useEffect(() => {
    setNewSetting({
      ...newSetting,
      items: cart,
      mount: cart.reduce((acc, current) => acc + current.totalMount, 0),
    });
  }, [cart, update]);

  const handleAdd = () => {
    if (!newItem.quantity || newItem.quantity === "" || newItem.quantity < 1)
      newItem.quantity = 1;
    const quantity = parseInt(newItem.quantity);
    newItem.quantity = quantity;
    product = products.find((e) => e.code == newItem.code);

    if (product) {
      const productInCart = cart.find(
        (element) => element.code === product.code
      );
      if (productInCart && productInCart.deposit === newItem.deposit) {
        productInCart.quantity += newItem.quantity;
        setUpdate(!update);
      } else {
        setCart([...cart, newItem]);
      }

      setNewSetting({
        ...newSetting,
        quantity: (newSetting.quantity += newItem.quantity),
      });

      setNewItem({
        code: "",
        name: "",
        quantity: "",
        deposit: "",
      });
    }
  };

  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
      const carroActualizado = [...cart];
      carroActualizado[index].quantity = nuevaCantidad;

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

  const handleDepositSelect = (selectedDeposit) => {
    setNewItem({
      ...newItem,
      deposit: selectedDeposit,
    });
  };

  const confirmSale = (event) => {
    event.preventDefault();
    dispatch(actions.newSetting(newSetting));
    navigate("/settings");
  };

  const cancelSale = () => {
    navigate("/settings");
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
      <h2>NUEVA AJUSTE</h2>
      <form className={styles.form}>
        <div className={styles.divs}>
          <div className={styles.subDivs}>
            <div>
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
            <div>
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
            <div className={styles.divs}>
              <div className={styles.dropdown}>
                <label htmlFor="">Deposito</label>
                <DropdownDeposit onSelect={handleDepositSelect} />
              </div>
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
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {newSetting.items[0] &&
                newSetting.items.map((item, index) => {
                  const product = products.find((e) => e.code === item.code);
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
                      <td>{product.name}</td>
                      <td>{product.marca}</td>
                      <td>
                        {"$ "}
                        {item.price}
                      </td>
                      <td>{item.price}</td>
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
                    {newSetting.mount}
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
