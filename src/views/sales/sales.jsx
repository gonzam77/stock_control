import styles from "./sales.module.css";
import { useSelector } from "react-redux";
//import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
//import ModalEditClientForm from "../modals/editModals/modalEditClientForm/modalEditClientForm";
//import ModalCreateClientForm from "../modals/createModals/modalCreateClientForm/modaleCreateClientForm";
import { Button } from "react-bootstrap";

export default function Sales() {
    //const showModalState = useSelector((state) => state.showModal);
    // const showCreateModal = useSelector(state => state.showCreateModal)
    const sales = useSelector((state) => state.sales);
    const orderSales = sales.sort((a,b) => b.date - a.date )
    const lastTenSales = orderSales.slice(0,10);
    //const dispatch = useDispatch();

    const openModal = (id) => {
        //dispatch(actions.showModal());
        //dispatch(actions.getClientId(id));
    };

    return (
        <div className={styles.container}>
            <div className={styles.title}>
                <h1>Ultimas Ventas</h1>
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
                            <th>Deposito</th>
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
                                    <td>{element.mount}</td>
                                    <td>{element.payType}</td>
                                    <td>{element.client}</td>
                                    <td>{element.deposit}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button variant="primary" onClick={() => openModal(element.id)}>
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
