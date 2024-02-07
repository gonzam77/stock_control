import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import styles from "./persons.module.css";
import ModalEditPersonForm from "../modals/editModals/modalEditPersonForm/modalEditPersonForm";
import ModalCreatePersonForm from "../modals/createModals/modalCreatePersonForm/modalCreatePersonForm";
import * as actions from "../../redux/actions";
import { useEffect } from "react";

export default function Persons() {
    const showModalState = useSelector((state) => state.showModal);
    const showCreateModal = useSelector(state => state.showCreateModal)
    const personas = useSelector((state) => state.persons);
    const dispatch = useDispatch();

    const openModal = (id) => {
        dispatch(actions.showModal());
        dispatch(actions.getPersonId(id));
    };

    useEffect(() => {
        if (personas.length === 0) {
          dispatch(actions.getAllPersons());
        }
        console.log('PERSONA', personas);
      }, [personas]);

    const openCreateModal = () => {
        dispatch(actions.showCreateModal())
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Button className={styles.createButton} variant="success" onClick={openCreateModal}>
                    Cargar Nuevo
                </Button>
            </div>

            <div className={styles.title}>
                <h1>Personas</h1>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>DNI</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personas.map((persona, index) => {
                            return (
                                <tr key={index} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                                    <td>{persona.NOMBRE}</td>
                                    <td>{persona.APELLIDO}</td>
                                    <td>{persona.DNI}</td>
                                    <td>{persona.EMAIL}</td>
                                    <td>{persona.TELEFONO}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button variant="primary" onClick={() => openModal(persona.ID_PERSONA)}>
                                            Modificar
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            {showModalState && <ModalEditPersonForm />}
            {showCreateModal && <ModalCreatePersonForm />}
        </div>
    );
}
