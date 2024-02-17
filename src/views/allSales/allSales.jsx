import styles from "./allSales.module.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import * as actions from '../../redux/actions';

export default function AllSales() {
    const sales = useSelector((state) => state.sales);
    const clients = useSelector((state) => state.clients);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(!clients.length) dispatch(actions.getAllClients());
    },[clients, dispatch])

    function redirect (id) {
        navigate(`/saleDetail/${id}`)
    }

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Ventas</h2>
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
                        {sales.map((element, index) => {
                            const client = clients?.find(e => e.ID_CLIENTE === element.ID_CLIENTE);
                            return (
                                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    <td>{element.NUMERO}</td>
                                    <td>
                                        {element.FECHA}
                                    </td>
                                    <td>{element.CANTIDAD}</td>
                                    <td>{'$ '}{element.MONTO}</td>
                                    <td>{element.TIPO_PAGO}</td>
                                    <td>{client?.CUIL}</td>
                                    <td>{element.DEPOSITO}</td>
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
