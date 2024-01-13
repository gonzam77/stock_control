import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NomenclatorsModal from "../../views/modals/nomenclatorsModal/nomenclatorsModal";
import styles from '../../views/clients/clients.module.css';
import CreateUserRol from "../nomenclatorsForms/createUserRol";
// import * as actions from "../../redux/actions";

export default function Roles() {
    // const showModalState = useSelector((state) => state.showModal);
    const showCreateModal = useSelector(state => state.showCreateModal)
    const roles = useSelector(state => state.roles)
    // const dispatch = useDispatch();

    const openModal = (id) => {
    };

    const openCreateModal = () => {
    }

    // const closeModal = () => {
    // };

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Button className={styles.createButton} variant="success" onClick={openCreateModal}>
                    Cargar Nuevo
                </Button>
            </div>

            <div className={styles.title}>
                <h1>Roles</h1>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((rol, index) => {
                            return (
                                <tr key={index}>
                                    <td>{rol.id}</td>
                                    <td>{rol.name}</td>
                                    <td>{rol.description}</td>
                                    <td>
                                        <Button variant="primary" onClick={() => openModal(rol.id)}>
                                            Modificar
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            {/* {showModalState && <ModalClientForm closeModal={closeModal} />} */}
            {showCreateModal && <NomenclatorsModal form={CreateUserRol} />}
        </div>
    );
}