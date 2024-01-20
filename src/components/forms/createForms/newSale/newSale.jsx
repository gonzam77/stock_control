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
  const formattedDate = date.toLocaleString();
  const [newSale, setNewSale] = useState({
    id: "",
    number: "",
    date: "",
    items: [],
    quantity: 0,
    deposit: "",
    mount: [],
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
    console.log('cart2', cart);
    setNewSale({
      ...newSale,
      items: cart,
      date: formattedDate,
      mount: cart.reduce((acc, current) => acc + current.totalMount, 0)
    });
  }, [cart, update]);


  const handleAdd = () => {
    if (!newItem.quantity  || newItem.quantity === '' || newItem.quantity < 1) newItem.quantity = 1
    const quantity = parseInt(newItem.quantity);
    newItem.quantity = quantity;
    console.log(newItem.quantity);

    if (newItem.code.length > 0) {
      product = products.find((element) => element.code === newItem.code);
    }

    if (product) {

      const selectedProduct = cart.find(element => element.code === product.code)
      if (selectedProduct) {
        product['quantity'] += newItem.quantity
        product['totalMount'] = product.quantity * product.price
        console.log('producto Modificado', product);
        setUpdate(!update);
      } else {
        product['quantity'] = newItem.quantity
        product['totalMount'] = product.quantity * product.price
        setCart([...cart, product]);
        console.log('producto', product);
      }

      setNewSale({
        ...newSale,
        quantity: newSale.quantity += product.quantity
      });

      setNewItem({
        code: "",
        name: "",
        quantity: ""
      })
    }
  };

  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad >= 0) {
      const carroActualizado = [...cart];
      carroActualizado[index].quantity = nuevaCantidad;
      carroActualizado[index].totalMount = nuevaCantidad * carroActualizado[index].price;
  
      setCart(carroActualizado);
      setUpdate(!update);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAdd();
    }
  };

  const deleteProduct = (code) => {
    if (code) {
      const index = cart.findIndex(e => e.code === code);
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
    navigate('/');
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
                <th>Marca</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Subtotales</th>
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
                      <td>{item.marca}</td>
                      <td>{'$ '}{item.price}</td>
                      <td>{item.stock}</td>
                      <td>{'$ '}{item.totalMount}</td>
                      <td>
                        <Button variant="danger" onClick={() => { deleteProduct(item.code) }}>Eliminar</Button>
                      </td>
                    </tr>)
                })}
            </tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center' }}>
                <td>{'$ '}{newSale.mount}</td>
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
