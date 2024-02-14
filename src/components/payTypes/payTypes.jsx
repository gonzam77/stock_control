import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateBrandForm from '../../views/modals/createModals/modalCreatePayTypeForm/modalCreatePayTypeForm';
import ModalEditPayTypeForm from '../../views/modals/editModals/modalEditPayTypeForm/modalEditPayTypeForm';
import styles from './brands.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";


export default function PayTypes() {

    const showCreateModal = useSelector((state) => state.showCreateModal);
    const showModalEditPayType = useSelector((state) => state.showModalEditPayType);
    const payTypes = useSelector((state) => state.payTypes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!payTypes.length) dispatch(actions.getAllPayTypes());
    }, [payTypes, dispatch])

    const openModal = (id) => {
        dispatch(actions.showModalEditPayType())
        dispatch(actions.getPayTypeId(id))
    };

    const openCreateModal = () => {
        dispatch(actions.showCreateModal())
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Button
                    className={styles.createButton}
                    variant="success"
                    onClick={openCreateModal}
                >
                    Cargar Nuevo Metodo de Pago
                </Button>
            </div>

            <div className={styles.title}>
                <h1>Metodos de Pago</h1>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payTypes?.map((payType, index) => {
                            return (
                                <tr key={index}>
                                    <td>{payType.NOMBRE}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button variant="primary" onClick={() => openModal(payType.ID_FORMA_PAGO)}>
                                            Modificar
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            {showModalEditPayType && <ModalEditPayTypeForm />}
            {showCreateModal && <ModalCreateBrandForm />}
        </div>
    );
}
