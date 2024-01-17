import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NomenclatorsModal from "../../views/modals/nomenclatorsModal/nomenclatorsModal";
import styles from "../../views/clients/clients.module.css";
import CreateUserRol from "../forms/createForms/createUserRol/createUserRol";

export default function Roles() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalState = useSelector((state) => state.showModalState);
  const roles = useSelector((state) => state.roles);

  const openModal = (id) => {};

  const openCreateModal = () => {
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
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
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((rol, index) => {
              return (
                <tr key={index}>
                  <td>{rol.name}</td>
                  <td>{rol.description}</td>
                  <td style={{ textAlign: 'center' }}>
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
