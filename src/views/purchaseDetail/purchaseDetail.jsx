import styles from "./purchaseDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as actions from '../../redux/actions';

export default function PurchasesDetail() {
    const { id } = useParams();
    const dispatch = useDispatch();

    // Estado para las compras
    const reduxPurchases = useSelector((state) => state.purchases);
    const [purchases, setPurchases] = useState(() => {
        // Cargar desde localStorage al iniciar
        const storedPurchases = localStorage.getItem("purchases");
        return storedPurchases ? JSON.parse(storedPurchases) : [];
    });

    // Compra específica basada en ID
    const purchase = purchases.find((e) => e.ID_COMPRA === parseInt(id));

    useEffect(() => {
        // Si las compras de Redux tienen datos, sincronízalos con el estado local y localStorage
        if (reduxPurchases.length > 0) {
            setPurchases(reduxPurchases);
            localStorage.setItem("purchases", JSON.stringify(reduxPurchases));
        }
    }, [reduxPurchases]);

    useEffect(() => {
        // Si no hay compras cargadas, obtenerlas desde el backend
        if (purchases.length === 0) {
            dispatch(actions.getAllPurchases());
        }
    }, [dispatch, purchases]);

    if (!purchase) {
        return <div>Cargando datos de la compra...</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Link to="/purchases">
                    <Button className={styles.createButton} variant="warning">
                        Volver
                    </Button>
                </Link>
                <Link to="/newPurchase">
                    <Button className={styles.createButton} variant="success">
                        Nueva Compra
                    </Button>
                </Link>
            </div>
            <div className={styles.title}>
                <h1>Detalle de la compra</h1>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Código Producto</th>
                            <th>Nombre Producto</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {purchase.DETALLE_COMPRAS?.map((element, index) => (
                            <tr key={index} style={{ textAlign: "center", verticalAlign: "middle" }}>
                                <td>{element?.CODIGO_PRODUCTO}</td>
                                <td>{element?.NOMBRE_PRODUCTO}</td>
                                <td>{'$'}{element?.PRECIO_PRODUCTO}</td>
                                <td>{element?.CANTIDAD}</td>
                                <td>{'$'}{element?.CANTIDAD * Math.round(element?.PRECIO_PRODUCTO * 100) / 100}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
