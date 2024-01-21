import styles from "./sales.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function LastSales() {
    const sales = useSelector((state) => state.sales);
    const orderSales = sales.sort((a,b) =>   b.number - a.number)
    const lastTenSales = orderSales.slice(0,10);
    const navigate = useNavigate();

    function redirect (id) {
        console.log(id);
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
                            return (
                                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                                    <td>{element.number}</td>
                                    <td>
                                        {element.date}
                                    </td>
                                    <td>{element.quantity}</td>
                                    <td>{'$ '}{element.mount}</td>
                                    <td>{element.payType}</td>
                                    <td>{element.client}</td>
                                    <td>{element.deposit}</td>
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
