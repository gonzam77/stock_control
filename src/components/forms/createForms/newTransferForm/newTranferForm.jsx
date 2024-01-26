import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import * as actions from "../../../../redux/actions";

export default function NewTransferForm() {
  let product = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [newTransfer, setNewTransfer] = useState({
    fromDeposit: "",
    toDeposit: "",
    quantity: 0,
    items: [],
  });

  const [cart, setCart] = useState([]);

  const [update, setUpdate] = useState();

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
  });

  useEffect(() => {
    setNewTransfer({
      ...newTransfer,
      items: cart,
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
      if (productInCart) {
        productInCart.quantity += newItem.quantity;
        setUpdate(!update);
      } else {
        setCart([...cart, newItem]);
      }

      setNewTransfer({
        ...newTransfer,
        quantity: (newTransfer.quantity += newItem.quantity),
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

  const handleFromDepositSelect = (selectedDeposit) => {
    setNewTransfer({
      ...newTransfer,
      fromDeposit: selectedDeposit,
    });
  };

  const handleToDepositSelect = (selectedDeposit) => {
    setNewTransfer({
      ...newTransfer,
      toDeposit: selectedDeposit,
    });
  };

  const confirmSetting = (event) => {
    event.preventDefault();
    console.log("ajuste final", newTransfer);
    dispatch(actions.newTransfer(newTransfer));
    navigate("/");
  };

  const cancelSetting = () => {
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
      <h2>NUEVA TRANSFERENCIA</h2>
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
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {newTransfer.items[0] &&
                newTransfer.items.map((item, index) => {
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
                      <td>{product.brand}</td>
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
        </div>
        <div className={styles.divs}>
          <div className={styles.dropdown}>
            <label htmlFor="">Desde Deposito</label>
            <DropdownDeposit onSelect={handleFromDepositSelect} />
          </div>
          <div className={styles.dropdown}>
            <label htmlFor="">Al Deposito</label>
            <DropdownDeposit onSelect={handleToDepositSelect} />
          </div>
        </div>
        <div className="modal-footer">
          <div className={styles.buttons}>
            <Button variant="danger" onClick={cancelSetting}>
              Cancelar
            </Button>
            <Button variant="success" onClick={confirmSetting}>
              Confirmar
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
