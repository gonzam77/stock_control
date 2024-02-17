import styles from "./sales.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as actions from '../../redux/actions';
import { useEffect } from "react";

export default function LastSales() {
    const sales = useSelector((state) => state.sales);
    const deposits = useSelector((state) => state.deposits);
    const clients = useSelector((state) => state.clients);
    const orderSales = sales.sort((a,b) =>   b.number - a.number)
    const lastTenSales = orderSales.slice(0,10);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!deposits.length) dispatch(actions.getAllDeposits());
        if(!clients.length) dispatch(actions.getAllClients());
    },[deposits, clients, dispatch])


    function redirect (id) {
        navigate(`/saleDetail/${id}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Ultimas Ventas</h2>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>N° Venta</th>
                            <th>Fecha</th>
                            <th>Items</th>
                            <th>Monto</th>
                            <th>Metodo de Pago</th>
                            <th>Cliente</th>
                            <th>Local</th>
                            <th>Detalle</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lastTenSales.map((element, index) => {
                            const client = clients?.find(e=> e.ID_CLIENTE === element.ID_CLIENTE)
                            const deposit = deposits?.find(e=> e.ID_BODEGA === element.ID_BODEGA)
                            return (
                                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    <td>{element.NUMERO}</td>
                                    <td>
                                        {element.FECHA}
                                    </td>
                                    <td>{element.CANTIDAD}</td>
                                    <td>{'$ '}{element.MONTO}</td>
                                    <td>{element.payType}</td>
                                    <td>{client?.CUIL}</td>
                                    <td>{deposit?.NOMBRE}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button variant="primary" onClick={()=>{redirect(element.id)}}>
                                            Detalle
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            {/* {showModalState && <ModalEditClientForm />}
      {showCreateModal && <ModalCreateClientForm />} */}
        </div>
    );
}
