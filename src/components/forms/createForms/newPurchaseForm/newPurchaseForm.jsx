import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownSupplier from "../../../dropdown/dropdownSupplier";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";
import { backURL, axiosConfig } from "../../../../App";
import axios from "axios";

export default function NewPurchaseForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const brands = useSelector((state) => state.brands);
    const [update, setUpdate] = useState();
    const [cart, setCart] = useState([]);

    const [newPurchase, setNewPurchase] = useState({
        NUMERO: null,
        PRODUCTOS: [],
        CANTIDAD: 0,
        ID_PROVEEDOR: null,
        ID_FORMA_PAGO: null,
        TOTAL_COMPRA: 0,
    });
    
    const [newItem, setNewItem] = useState({
        CODIGO: '',
        CANTIDAD: 0,
        PRECIO_COMPRA: 0,
        SUBTOTAL:0
    });
    
    async function postPurchase(newPurchase){

        console.log('Esta es la compra', newPurchase);
        
        try {
            await axios.post(`${backURL}/compra/nuevo`, newPurchase, axiosConfig)
        } catch (error) {
            console.log(error);
        };
    };
    
    const confirmSale = async (event) => {
        event.preventDefault();
        await postPurchase({ Compra: newPurchase});
        navigate('/purchases');
    };

    useEffect(() => {
        setNewPurchase(prev => ({
            ...prev,
            PRODUCTOS: cart,
        }));

        if (products.length === 0) dispatch(actions.getAllProducts());
        if (brands.length === 0) dispatch(actions.getAllBrands());
        
    }, [cart, brands, update, products, dispatch]);
    

    function handleAdd() {

        const product = products.find(e => e.CODIGO === newItem.CODIGO);
        
        if (product) {

            const productoEnCarro = newPurchase.PRODUCTOS.find(e => e.CODIGO === newItem.CODIGO);
            
            if (!productoEnCarro || productoEnCarro.CANTIDAD === 0){
                
                //newItem.CANTIDAD = newItem.CANTIDAD;
                newItem.SUBTOTAL = newItem.CANTIDAD * newItem.PRECIO_COMPRA;

            } else {
                
                newItem.CANTIDAD = parseInt(productoEnCarro.CANTIDAD) + parseInt(newItem.CANTIDAD);
                newItem.SUBTOTAL = parseInt(newItem.CANTIDAD) * parseFloat(newItem.PRECIO_COMPRA);
                
                setUpdate(!update);
                
            };

            setNewPurchase({
                ...newPurchase,
                CANTIDAD: newPurchase.CANTIDAD + newItem.CANTIDAD,
                TOTAL_COMPRA: newPurchase.TOTAL_COMPRA + newItem.SUBTOTAL,
                PRODUCTOS: [
                    ...newPurchase.PRODUCTOS,
                    newItem
                ]
            });   

            console.log('Item a agregar: ', newItem);
            console.log('Listado de productos: ', newPurchase.PRODUCTOS );
            
            

            setNewItem({
                CODIGO: '',
                CANTIDAD: 0,
                PRECIO_COMPRA: 0
            });

        } else console.log('No se encontró el producto');
            
    };

    const handleCantidadChange = (event, index) => {

        const nuevaCantidad = parseInt(event.target.value, 10);
        
        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
            
            const carroActualizado = [...cart];
            carroActualizado[index].PRECIO_COMPRA = carroActualizado[index].PRECIO_COMPRA / carroActualizado[index].CANTIDAD;
            carroActualizado[index].CANTIDAD = nuevaCantidad;
            carroActualizado[index].PRECIO_COMPRA *= nuevaCantidad;

            setCart(carroActualizado);
            setUpdate(!update);
        };
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        };
    };

    const deleteProduct = (CODIGO) => {
        if (CODIGO) {
            const index = cart.findIndex(e => e.CODIGO === CODIGO);
            cart.splice(index, 1);
            setUpdate(!update);
        };
    };

    const handlePayTypeSelect = (selectedPayType) => {
        console.log('Metodo de pago seleccionado: ', parseInt(selectedPayType));
        
        setNewPurchase({
            ...newPurchase,
            ID_FORMA_PAGO: parseInt(selectedPayType),
        });
    };

    const handleSupplierSelect = (selectedSupplier) => {
        setNewPurchase({
            ...newPurchase,
            ID_PROVEEDOR: parseInt(selectedSupplier),
        });
    };

    const handleDepositSelect = (selectedDeposit) => {
        setNewPurchase({
            ...newPurchase,
            BODEGA: parseInt(selectedDeposit),
        });
    };

    const cancelSale = () => {
        navigate('/purchases');
    };

    function handleChange(event) {
        const target = event.target.name;
        let value = event.target.value;
    
        if (target === 'CANTIDAD' || target === 'PRECIO_COMPRA') {
            value = parseFloat(value) || 0; // Asegura un valor numérico
        }
    
        setNewItem({
            ...newItem,
            [target]: value,
        });
    }
    
    function handleChangePurchase(event) {
        const target = event.target.name;
        let value = event.target.value;
    
        if (target === 'NUMERO' || target === 'TOTAL_COMPRA') {
            value = parseFloat(value) || 0; // Asegura un valor numérico
        }
    
        setNewPurchase({
            ...newPurchase,
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
                                name="NUMERO"
                                value={newPurchase.NUMERO}
                                onChange={handleChangePurchase}
                                placeholder="Codigo..."
                                type="text"
                            />
                        </div>
                        <div>
                            <label >Codigo</label>
                            <input
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                name="CODIGO"
                                value={newItem.CODIGO}
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
                                name="CANTIDAD"
                                value={newItem.CANTIDAD}
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
                                name="PRECIO_COMPRA"
                                value={newItem.PRECIO_COMPRA}
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
                                <th>Marca</th>
                                <th>Precio Venta.</th>
                                <th>Precio Compra</th>
                                <th>Subtotal Compra</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                
                                newPurchase.PRODUCTOS?.map((item, index) => {
                                   const product = products?.find(e=>e.CODIGO===item.CODIGO)
                                   const brand = brands?.find(e=>e.id_marca === product.id_marca)
                                    return (
                                        <tr key={index} style={{ textAlign: 'center' }}>
                                            <td>
                                                <div>
                                                    <input
                                                        autoComplete="off"
                                                        name="NUEVA_CANTIDAD"
                                                        value={item.CANTIDAD}
                                                        onChange={(e) => handleCantidadChange(e, index)}
                                                        type="number"
                                                    />
                                                </div>
                                            </td>
                                            <td>{item.CODIGO}</td>
                                            <td>{product.NOMBRE}</td>
                                            <td>{brand.NOMBRE}</td>
                                            <td>{'$ '}{item.PRECIO_COMPRA}</td>
                                            <td>{item.PRECIO_COMPRA}</td>
                                            <td>{'$ '}{Math.round(item.SUBTOTAL * 100) / 100}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => { deleteProduct(item.CODIGO) }}>Eliminar</Button>
                                            </td>
                                        </tr>)
                                })
                            }
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
                                <td><b>{'$ '}{Math.round(parseFloat(newPurchase.TOTAL_COMPRA) * 100) / 100}</b></td>
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
};