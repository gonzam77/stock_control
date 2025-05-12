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
import Swal from 'sweetalert2';

export default function NewPurchaseForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const brands = useSelector((state) => state.brands);
    const users = useSelector((state)=> state.users);
    const user = users.find(e => e.NOMBRE === localStorage.getItem('usuario'));
    
    const [newPurchase, setNewPurchase] = useState({
        NUMERO_COMPRA: null,
        PRODUCTOS: [],
        CANTIDAD: 0,
        ID_PROVEEDOR: null,
        ID_FORMA_PAGO: null,
        TOTAL_COMPRA: 0,
        USER: null
    });

    newPurchase.USER = user;
    
    const [newItem, setNewItem] = useState({
        CODIGO: '',
        CANTIDAD: 0,
        PRECIO_COMPRA: 0,
        SUBTOTAL:0
    });
    
    async function postPurchase(newPurchase){
        console.log('Nueva compra:', newPurchase);
        
        try {
            await axios.post(`${backURL}/compra/nuevo`, newPurchase, axiosConfig)
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: 'Error!',
                text: error.response.data.Message,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#0a7f02',
                keydownListenerCapture: false
            });
        };
    };
    
    const confirmSale = async (event) => {
        event.preventDefault();
        await postPurchase({ Compra: newPurchase});
        navigate('/purchases');
    };
    

    useEffect(() => {
        if (products.length === 0) dispatch(actions.getAllProducts());
        if (brands.length === 0) dispatch(actions.getAllBrands());
        if (users.length === 0) dispatch(actions.getAllUsers());
        
    }, [users, brands, products, dispatch]);
    

    function handleAdd() {
        const product = products.find(e => e.CODIGO === newItem.CODIGO);
    
        if (product) {
            const existingProductIndex = newPurchase.PRODUCTOS.findIndex(e => e.CODIGO === newItem.CODIGO);
    
            let updatedProducts = [...newPurchase.PRODUCTOS];
            let updatedCantidad = newPurchase.CANTIDAD;
            let updatedTotalCompra = newPurchase.TOTAL_COMPRA;
    
            if (existingProductIndex !== -1) {
                // Actualiza la cantidad y subtotal si el producto ya está en el carrito
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    CANTIDAD: updatedProducts[existingProductIndex].CANTIDAD + newItem.CANTIDAD,
                    SUBTOTAL: (updatedProducts[existingProductIndex].CANTIDAD + newItem.CANTIDAD) * newItem.PRECIO_COMPRA,
                };
            } else {
                // Agrega el nuevo producto al carrito
                updatedProducts.push({
                    ...newItem,
                    SUBTOTAL: newItem.CANTIDAD * newItem.PRECIO_COMPRA,
                });
            }
    
            updatedCantidad += newItem.CANTIDAD;
            updatedTotalCompra += newItem.CANTIDAD * newItem.PRECIO_COMPRA;
    
            setNewPurchase({
                ...newPurchase,
                PRODUCTOS: updatedProducts,
                CANTIDAD: updatedCantidad,
                TOTAL_COMPRA: updatedTotalCompra,
            });
    
            setNewItem({
                CODIGO: '',
                CANTIDAD: 0,
                PRECIO_COMPRA: 0,
            });
        } else {
            console.log('No se encontró el producto');
        }
    }
    

    const handleCantidadChange = (event, index) => {
        const nuevaCantidad = parseInt(event.target.value, 10);
    
        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
            const productosActualizados = [...newPurchase.PRODUCTOS];
            const producto = productosActualizados[index];
    
            const precioUnitario = producto.SUBTOTAL / producto.CANTIDAD; // Calcula el precio unitario
            producto.CANTIDAD = nuevaCantidad;
            producto.SUBTOTAL = precioUnitario * nuevaCantidad; // Actualiza el subtotal
    
            const totalCompraActualizado = productosActualizados.reduce(
                (total, item) => total + item.SUBTOTAL,
                0
            );
            const cantidadTotalActualizada = productosActualizados.reduce(
                (total, item) => total + item.CANTIDAD,
                0
            );
    
            setNewPurchase({
                ...newPurchase,
                PRODUCTOS: productosActualizados,
                TOTAL_COMPRA: totalCompraActualizado,
                CANTIDAD: cantidadTotalActualizada,
            });
        }
    };
    

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleAdd();
        };
    };

    const deleteProduct = (CODIGO) => {
        if (CODIGO) {
            const selectedProduct = newPurchase.PRODUCTOS.find(e => e.CODIGO === CODIGO);
            
            if (selectedProduct) {
                setNewPurchase({
                    ...newPurchase,
                    TOTAL_COMPRA: newPurchase.TOTAL_COMPRA - selectedProduct.SUBTOTAL,
                    CANTIDAD: newPurchase.CANTIDAD - selectedProduct.CANTIDAD,
                    PRODUCTOS: newPurchase.PRODUCTOS.filter(e => e.CODIGO !== CODIGO), // Crea un nuevo array sin el producto
                });
    
                console.log('Producto eliminado:', CODIGO);
            } else {
                console.log('No se encontró el producto a eliminar');
            }
        }
    };
    
    const handlePayTypeSelect = (selectedPayType) => {
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
    
        if (target === 'PRECIO_COMPRA') value = Math.round(parseFloat(value) * 100) / 100; // Asegura un valor numérico
        if (target === 'CANTIDAD') value = parseInt(value) //Asegura entero.
    
        setNewItem({
            ...newItem,
            [target]: value,
        });
    }
    
    function handleChangePurchase(event) {
        const target = event.target.name;
        let value = event.target.value;
    
        if (target === 'TOTAL_COMPRA') {
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
                            <label >Factura N°</label>
                            <input
                                onKeyDown={handleKeyDown}
                                autoComplete="off"
                                name="NUMERO_COMPRA"
                                value={newPurchase.NUMERO_COMPRA}
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
                          <Table striped bordered hover className="rounded-3 overflow-hidden">
                        <thead>
                            <tr>
                                <th>Cantidad</th>
                                <th>Codigo</th>
                                <th>Producto</th>
                                <th>Marca</th>
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
                                            <td>{'$ '}{Math.round(item.SUBTOTAL * 100) / 100}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => { deleteProduct(item.CODIGO) }}>Eliminar</Button>
                                            </td>
                                        </tr>)
                                })
                            }
                        </tbody>
                    </Table>

                          <Table striped bordered hover className="rounded-3 overflow-hidden">
                        <thead>
                            <tr>
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style={{ textAlign: 'center' }}>
                                <td><b>{'$ '}{Math.round(newPurchase.TOTAL_COMPRA * 100) / 100}</b></td>
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