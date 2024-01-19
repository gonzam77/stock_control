import styles from "../createFomrs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import * as actions from "../../../../redux/actions";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownClient from "../../../dropdown/dropdownClient";
import DropdownPayType from "../../../dropdown/dropdownPayType";

export default function newSaleForm() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const cart = useSelector((state) => state.cart);
  const [newSale, setNewSale] = useState({
    id: "",
    number: "",
    date: "",
    items: [],
    date: "",
    deposit: "",
    payType: "",
    total: "",
    client: "",
  });

  useEffect(() => {
    console.log('cart',cart);
    setNewSale({
      ...newSale,
      items: cart[0],
    });
    console.log('new sale', newSale);
  }, [cart]);

  const items = [];

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: "",
  });

  const handleAdd = () => {
    let product = null;

    if (newItem.code.length > 0) {
      product = products.find((element) => element.code === newItem.code);
    } else if (newItem.name.length > 0) {
      product = products.find((element) => element.name === newItem.name);
    }

    if (product) {
      console.log(product);
      items.push(product);
      console.log(items);
      dispatch(actions.addToCart(items));
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
      deposit: selectedClient,
    });
  };

  const handleDepositSelect = (selectedDeposit) => {
    setNewSale({
      ...newSale,
      deposit: selectedDeposit,
    });
  };

  const closeCreateModal = (event) => {
    event.preventDefault();
    const date = new Date();
    setNewSale({
      ...newSale,
      date: date,
      items: newItem,
    });
    dispatch(actions.newSale(newSale));
    dispatch(actions.hideNewSaleModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideNewSaleModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewItem({
      ...newItem,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Codigo</label>
          <input
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
            autoComplete="off"
            name="quantity"
            value={newItem.quantity}
            onChange={handleChange}
            placeholder="Cantidad..."
            type="text"
          />
          <Button onClick={handleAdd}>Agregar</Button>
        </div>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Producto</th>
                <th>Precio</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {
              newSale.items &&
                newSale.items.map((item, index) => {
                  <tr key={index}>
                    <td>{item.quantity}</td>
                    <td>{item.name}</td>
                    <td>{item.price}</td>
                    <td>{item.stock}</td>
                  </tr>;
                })}
            </tbody>
          </Table>
        </div>
        <div className={styles.divs}>
          <DropdownPayType onSelect={handlePayTypeSelect} />
        </div>
        <div className={styles.divs}>
          <DropdownClient onSelect={handleClientSelect} />
        </div>
        <div className={styles.divs}>
          <DropdownDeposit onSelect={handleDepositSelect} />
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
