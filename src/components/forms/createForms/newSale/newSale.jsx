import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createFomrs.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownClient from "../../../dropdown/dropdownClient";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";


export default function NewSaleForm() {
  let product = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const date = new Date();
  const formattedDate = date.toLocaleString()
  const [newSale, setNewSale] = useState({
    id: "",
    number: "",
    date: "",
    items: [],
    deposit: "",
    payType: "",
    total: "",
    client: "",
  });

  const [cart, setCart] = useState([]);

  const [update, setUpdate] = useState();

  const [newItem, setNewItem] = useState({
    code: "",
    name: "",
    quantity: ""
  });

  useEffect(() => {
    setNewSale({
      ...newSale,
      items: cart,
      date: formattedDate
    })
  }, [cart]);


  const handleAdd = () => {
    if (newItem.quantity === null || newItem.quantity === '') newItem.quantity = 1
    newItem.quantity *= 1;

    if (newItem.code.length > 0) {
      product = products.find((element) => element.code === newItem.code);
    }

    if (product) {
      const selectedProduct = cart.find(element => element.code === product.code)
      if (selectedProduct) {
        product['quantity'] += newItem.quantity
      } else {
        product['quantity'] = newItem.quantity
        setCart([...cart, product]);
      }
    }
    setNewItem({
      code: "",
      name: "",
      quantity: ""
    })
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  const deleteProduct = (id) => {
    if (id) {
      const index = cart.findIndex(e => e.id === id);
      cart.splice(index, 1);
      if (update === 1) setUpdate(0);
      else setUpdate(1);
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

  const confirmSale = (event) => {
    event.preventDefault();
    dispatch(actions.newSale(newSale));
  };

  const cancelSale = () => {
    navigate('/');
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
            <div>
              <label >Codigo</label>
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
                <th>Precio</th>
                <th>Stock</th>
                <th>Total</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                newSale.items[0] &&
                newSale.items.map((item, index) => {
                  return (
                    <tr key={index} style={{ textAlign: 'center' }}>
                      <td>{item.quantity}</td>
                      <td>{item.code}</td>
                      <td>{item.name}</td>
                      <td>{'$ '}{item.price}</td>
                      <td>{item.stock}</td>
                      <td>{'$ '}{item.price * item.quantity}</td>
                      <td>
                        <Button variant="primary">Modificar</Button>
                      </td>
                      <td>
                        <Button variant="danger" onClick={() => { deleteProduct(item.id) }}>Eliminar</Button>
                      </td>
                    </tr>)
                })}
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
        <div className={styles.divs}>
        </div>
        <div className={styles.divs}>
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
