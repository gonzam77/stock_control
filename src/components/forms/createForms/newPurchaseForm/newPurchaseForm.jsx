import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";

export default function NewPurchaseForm() {
    let product = null;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);

    const [newPurchase, setNewPurchase] = useState({
        number: "",
        items: [],
        quantity: 0,
        deposit: "",
        mount: [],
        payType: "",
        total: "",
        supplier: "",
        totalMount:'',
    });


    const [cart, setCart] = useState([]);

    const [update, setUpdate] = useState();

    const [newItem, setNewItem] = useState({
        code: "",
        name: "",
        quantity: "",
        price: '',
        totalMount: ''
    });

    useEffect(() => {
        setNewPurchase({
            ...newPurchase,
            items: cart,
            mount: cart.reduce((acc, current) => acc + current.totalMount, 0)
        });
    }, [cart, update]);


    const handleAdd = () => {

        if (!newItem.quantity || newItem.quantity === '' || newItem.quantity < 1) newItem.quantity = 1
        const quantity = parseInt(newItem.quantity);
        newItem.quantity = quantity;
        product = products.find(e => e.code == newItem.code)

        if (product) {
            const productInCart = cart.find(element => element.code === product.code)
            if (productInCart) {
                productInCart.quantity += newItem.quantity;
                productInCart.totalMount = productInCart.quantity * productInCart.price
                setUpdate(!update);
            } else {
                newItem.totalMount = newItem.quantity * newItem.price
                setCart([...cart, newItem]);
            }

            setNewPurchase({
                ...newPurchase,
                quantity: newPurchase.quantity += newItem.quantity
            });

            setNewItem({
                code: "",
                name: "",
                quantity: "",
                price: '',
                totalMount: ''
            })
        }
    };

    const handleCantidadChange = (event, index) => {
        const nuevaCantidad = parseInt(event.target.value, 10);
        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
            const carroActualizado = [...cart];
            carroActualizado[index].totalMount = carroActualizado[index].totalMount / carroActualizado[index].quantity;
            carroActualizado[index].quantity = nuevaCantidad;
            carroActualizado[index].totalMount *= nuevaCantidad;

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
        setNewPurchase({
            ...newPurchase,
            payType: selectedPayType,
        });
    };

    const handleSupplierSelect = (selectedSupplier) => {
        setNewPurchase({
            ...newPurchase,
            supplier: selectedSupplier,
        });
    };

    const handleDepositSelect = (selectedDeposit) => {
        setNewPurchase({
            ...newPurchase,
            deposit: selectedDeposit,
        });
    };

    const confirmSale = (event) => {
        event.preventDefault();
        dispatch(actions.newPurchase(newPurchase));
        navigate('/purchases');
    };

    const cancelSale = () => {
        navigate('/purchases');
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
            <h2>NUEVA COMPRA</h2>
            <form className={styles.form}>
                <div className={styles.divs}>
                    <div className={styles.subDivs}>
                        <div>
                            <label >Numero de Compra</label>
                            <input
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                name="code"
                                value={newPurchase.number}
                                onChange={handleChange}
                                placeholder="Codigo..."
                                type="text"
                            />
                        </div>
                        <div>
                            <label >Codigo</label>
                            <input
                                onKeyDown={handleKeyDown}
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
                        <div>
                            <label>Precio Unitario</label>
                            <input
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                name="price"
                                value={newItem.price}
                                onChange={handleChange}
                                placeholder="Precio..."
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
                                <th>Precio Venta.</th>
                                <th>Precio Compra</th>
                                <th>Subtotal Compra</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                newPurchase.items[0] &&
                                newPurchase.items.map((item, index) => {
                                   const product = products.find(e=>e.code===item.code)
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
                                            <td>{product.name}</td>
                                            <td>{product.brand}</td>
                                            <td>{'$ '}{item.price}</td>
                                            <td>{item.price}</td>
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
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: 'center' }}>
                                <td><b>{'$ '}{newPurchase.mount}</b></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
                <div className={styles.divs}>
                    <div className={styles.dropdown}>
                        <label htmlFor="">Forma de pago</label>
                        <DropdownPayType onSelect={handlePayTypeSelect} />
                        <label htmlFor="">Proveedor</label>
                        <DropdownSupplier onSelect={handleSupplierSelect} />
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
