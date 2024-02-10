import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import * as actions from "../../../../redux/actions";

export default function NewSettingForm() {
  let product = null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const [newSetting, setNewSetting] = useState({
    items: [],
    CANTIDAD: 0,
    ID_BODEGA: "",
  });

  const [cart, setCart] = useState([]);

  const [update, setUpdate] = useState();

  const [newItem, setNewItem] = useState({
    CODIGO: "",
    NOMBRE: "",
    CANTIDAD: "",
  });

  useEffect(() => {
    setNewSetting({
      ...newSetting,
      items: cart,
    });
  }, [cart, newSetting, update]);

  const handleAdd = () => {
    if (!newItem.CANTIDAD || newItem.CANTIDAD === "" || newItem.CANTIDAD < 1)
      newItem.CANTIDAD = 1;
    const CANTIDAD = parseInt(newItem.CANTIDAD);
    newItem.CANTIDAD = CANTIDAD;
    product = products.find((e) => e.CODIGO === newItem.CODIGO);

    if (product) {
      const productInCart = cart.find(
        (element) => element.CODIGO === product.CODIGO
      );
      if (productInCart && productInCart.ID_BODEGA === newItem.ID_BODEGA) {
        productInCart.CANTIDAD += newItem.CANTIDAD;
        setUpdate(!update);
      } else {
        setCart([...cart, newItem]);
      }

      setNewSetting({
        ...newSetting,
        CANTIDAD: (newSetting.CANTIDAD += newItem.CANTIDAD),
      });

      setNewItem({
        CODIGO: "",
        NOMBRE: "",
        CANTIDAD: "",
        ID_BODEGA: "",
      });
    }
  };

  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
      const carroActualizado = [...cart];
      carroActualizado[index].CANTIDAD = nuevaCantidad;

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

  const handleDepositSelect = (selectedDeposit) => {
    setNewSetting({
      ...newSetting,
      ID_BODEGA: selectedDeposit,
    });
  };

  const confirmSetting = (event) => {
    event.preventDefault();
    dispatch(actions.newSetting(newSetting));
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
      <h2>NUEVA AJUSTE</h2>
      <form className={styles.form}>
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
                <th>Stock</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {newSetting.items[0] &&
                newSetting?.items?.map((item, index) => {
                  const product = products?.find((e) => e.CODIGO === item.CODIGO);
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
                      <td>{product.NOMBRE}</td>
                      <td>{product.MARCA}</td>
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
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </div>
        <div className={styles.divs}>
          <div className={styles.dropdown}>
            <label htmlFor="">Deposito</label>
            <DropdownDeposit onSelect={handleDepositSelect} />
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
