import { useDispatch, useSelector } from "react-redux";
import { Button, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../createForms.module.css";
import DropdownDeposit from "../../../dropdown/dropdownDeposit";
import DropdownClient from "../../../dropdown/dropdownClient";
import DropdownPayType from "../../../dropdown/dropdownPayType";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { backURL, axiosConfig } from "../../../../App";
import Swal from 'sweetalert2';


export default function NewSaleForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const offers = useSelector((state) => state.offers);
  const deposits = useSelector((state) => state.deposits);
  const brands = useSelector((state) => state.brands);
  const clients = useSelector((state) => state.clients);
  const payTypes = useSelector((state) => state.payTypes);

  const [newSale, setNewSale] = useState({
    ID_FORMA_PAGO: null,
    ID_CLIENTE: null,
    BODEGA: 1,
    PRODUCTOS: [],
    CANTIDAD: 0,
    TOTAL_VENTA: 0
  });

  const [newItem, setNewItem] = useState({
    CODIGO: '',
    CANTIDAD: 0,
    PRECIO_VENTA: 0,
    SUBTOTAL: 0,
  });

  useEffect(() => {
    if (!products.length) dispatch(actions.getAllProducts());
    if (!offers.length) dispatch(actions.getAllOffers());
    if (!payTypes.length) dispatch(actions.getAllPayTypes());
    if (!clients.length) dispatch(actions.getAllClients());
    if (!brands.length) dispatch(actions.getAllBrands());
    if (!deposits.length) dispatch(actions.getAllDeposits());
  }, [products, offers, dispatch, payTypes, clients, brands, deposits, newSale]);


  async function postSale(newSale) {
    try {
      await axios.post(`${backURL}/venta/nuevo`, newSale, axiosConfig)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.log(error);
    }
  }

  const handleAdd = () => {
    
    const selectedProduct = products.find(e => e.CODIGO === newItem?.CODIGO.toUpperCase());

    if (selectedProduct) {

      //comprueba que la cantidad no sea nula
      if (!newItem.CANTIDAD || newItem.CANTIDAD === 0 || newItem.CANTIDAD === '')
        newItem.CANTIDAD = 1;
      else 
        newItem.CANTIDAD = parseInt(newItem.CANTIDAD);

      //busca si el producto esta en oferta y calcula el precio final
      const offerProduct = offers.find((e) => e.CODIGO === newItem.CODIGO);
      
      if (offerProduct) {
        const discount = parseFloat(offerProduct.PORCENTAJE_DESCUENTO)
        newItem.PRECIO_VENTA = (1 - discount / 100) * parseFloat(selectedProduct.PRECIO_VENTA);
      }
      else { 
        newItem.PRECIO_VENTA = parseFloat(selectedProduct?.PRECIO_VENTA); 
      };

      //Buscamos si el producto ya fue cargado en la venta
      const existingProductIndex = newSale.PRODUCTOS.findIndex(e => e.CODIGO === newItem.CODIGO);
  
      let updatedProducts = [...newSale.PRODUCTOS];
      let updatedCantidad = newSale.CANTIDAD;
      let updatedTotalCompra = newSale.TOTAL_VENTA;
  
      if (existingProductIndex !== -1) {
        // Actualiza la cantidad y subtotal si el producto ya está en el carrito
        updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            CANTIDAD: updatedProducts[existingProductIndex].CANTIDAD + newItem.CANTIDAD,
            SUBTOTAL: (updatedProducts[existingProductIndex].CANTIDAD + newItem.CANTIDAD) * newItem.PRECIO_VENTA,
        };
      } else {
        // Agrega el nuevo producto al carrito
        updatedProducts.push({
            ...newItem,
            SUBTOTAL: newItem.CANTIDAD * newItem.PRECIO_VENTA
        });
      };
      
      updatedCantidad += newItem.CANTIDAD;
      updatedTotalCompra += newItem.CANTIDAD * newItem.PRECIO_VENTA;

      setNewSale({
        ...newSale,
        PRODUCTOS: updatedProducts,
        CANTIDAD: updatedCantidad,
        TOTAL_VENTA: Math.round(updatedTotalCompra * 100) / 100,
      });

      setNewItem({
          CODIGO: '',
          CANTIDAD: 0,
          PRECIO_VENTA: 0
      });
 
    } else {
      Swal.fire({
          title: 'Error!',
          text: 'Producto no encontrado!',
          icon: 'error',
          confirmButtonText: 'Cerrar',
          confirmButtonColor: '#0a7f02',
          keydownListenerCapture: false
      });
   }; 

  };
  
  const handleCantidadChange = (event, index) => {
    const nuevaCantidad = parseInt(event.target.value, 10);
    
        if (!isNaN(nuevaCantidad) && nuevaCantidad > 0) {
            const productosActualizados = [...newSale.PRODUCTOS];
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
    
            setNewSale({
                ...newSale,
                PRODUCTOS: productosActualizados,
                TOTAL_VENTA: totalCompraActualizado,
                CANTIDAD: cantidadTotalActualizada,
            });
        }
  };

  // const handleKeyDown = (event) => {
  //   if (event.key === "Enter") {
  //     handleAdd();
  //   }
  // };

  const deleteProduct = (CODIGO) => {
    if (CODIGO) {
      
      const selectedProduct = newSale.PRODUCTOS.find(e => e.CODIGO === CODIGO);
      
      if (selectedProduct) {
          setNewSale({
              ...newSale,
              TOTAL_VENTA: newSale.TOTAL_VENTA - selectedProduct.SUBTOTAL,
              CANTIDAD: newSale.CANTIDAD - selectedProduct.CANTIDAD,
              PRODUCTOS: newSale.PRODUCTOS.filter(e => e.CODIGO !== CODIGO), // Crea un nuevo array sin el producto
          });

          console.log('Producto eliminado:', CODIGO);
      } else {
          console.log('No se encontró el producto a eliminar');
      }
  }
  };

  const handlePayTypeSelect = (selectedPayType) => {
    setNewSale({
      ...newSale,
      ID_FORMA_PAGO: parseInt(selectedPayType),
    });
  };

  const handleClientSelect = (selectedClient) => {
    const clientId = clients?.find(e => e.CUIL === selectedClient)
    setNewSale({
      ...newSale,
      ID_CLIENTE: clientId.ID_CLIENTE,
    });
  };


  const handleDepositSelect = (selectedDeposit) => {
    setNewSale({
      ...newSale,
      BODEGA: parseInt(selectedDeposit),
    });
  };

  const confirmSale = async (event) => {
    event.preventDefault();
    await postSale({ Venta : newSale })
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
          <div className={styles.dropdown}>
            <label htmlFor="">Cliente</label>
            <DropdownClient onSelect={handleClientSelect} />
            <label htmlFor="">Deposito</label>
            <DropdownDeposit onSelect={handleDepositSelect} />
            <label htmlFor="">Forma de pago</label>
            <DropdownPayType onSelect={handlePayTypeSelect} />
          </div>
        </div>
        <div className={styles.divs}>
          <div className={styles.subDivs}>
            <div className={styles.divs}>
              <label>Codigo</label>
              <input
                // onKeyDown={handleKeyDown}
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
                //onKeyDown={handleKeyDown}
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
                <th>Precio U.</th>
                <th>Precio T.</th>
                <th>Eliminar</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {
                newSale.PRODUCTOS?.map((item, index) => {
                  const product = products?.find(e=>e.CODIGO===item.CODIGO)
                  const brand = brands?.find(e => e.ID_MARCA === product.ID_MARCA);
                  console.log('newSale', newSale);
                  
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
                      <td>{product?.CODIGO}</td>
                      <td>{product?.NOMBRE}</td>
                      <td>{brand?.NOMBRE}</td>
                      <td>
                        {"$ "}
                        {product?.PRECIO_VENTA}
                      </td>
                      <td>
                        {"$ "}
                        {item?.SUBTOTAL.toFixed(2)}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          onClick={() => {
                            deleteProduct(item?.CODIGO);
                          }}
                        >
                          Eliminar
                        </Button>
                      </td>
                      <td>{item?.stock}</td>
                    </tr>
                  );
                })
              }
            </tbody>
          </Table>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>TOTAL</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: "center" }}>
                <td>
                  <b>
                    {"$ "}
                    {newSale.TOTAL_VENTA}
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
