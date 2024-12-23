import styles from "./purchases.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as actions from '../../redux/actions';

export default function PurchasesDetail() {
  const purchases = useSelector((state) => state.purchases);
  const [hasFetched, setHasFetched] = useState(false);
  const dispatch = useDispatch();

  useEffect(()=>{
    if (!hasFetched && purchases.length === 0) {
      dispatch(actions.getAllPurchases());
      setHasFetched(true); // Marca que ya intentaste obtener los datos evitando el loop infinito.
    }
  },[dispatch, purchases, hasFetched])

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Link to='/newPurchase'>
          <Button className={styles.createButton} variant="success" >
            Nueva Compra
          </Button>
        </Link>
      </div>
      <div className={styles.title}>
        <h1>Compras</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>N° Compra</th>
              <th>Fecha</th>
              <th>Monto Total</th>
              <th>Forma de Pago</th>
              <th>Cuil Proveedor</th>
              <th>Nombre Proveedor</th>
              <th>Usuario</th>
              <th>Detalle</th>
            </tr>
          </thead>
          <tbody>
            {purchases?.map((purchase, index) => {
              const fecha = new Date(purchase.FECHA_COMPRA);
              const total = purchase?.DETALLE_COMPRAS?.reduce((suma, producto) => {
                return suma + producto.PRECIO_PRODUCTO * producto.CANTIDAD;
              }, 0);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{purchase?.NUMERO_COMPRA}</td>
                  <td>{fecha.toLocaleString()}</td>
                  <td>{'$'}{Math.round(total * 100) / 100}</td>
                  <td>{purchase?.FORMA_PAGO.NOMBRE}</td>
                  <td>{purchase?.CUIL_PROVEEDOR}</td>
                  <td>{purchase?.NOMBRE_PROVEEDOR}</td>
                  <td>{purchase?.USUARIO.NOMBRE}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/purchaseDetail/${purchase.ID_COMPRA}`}>
                      <Button variant="primary">Detalle</Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
