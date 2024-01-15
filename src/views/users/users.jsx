import styles from "./users.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreateUserForm from '../modals/createModals/madalCreateUserForm/modalCreateUserForm';
import { Button } from "react-bootstrap";

export default function Users() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getClientId(id));
  };

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  const openCreateModal = () => {
    dispatch(actions.showCreateModal())
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button className={styles.createButton} variant="success" onClick={openCreateModal}>
          Cargar Nuevo
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Usuarios</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Fecha Nacimiento</th>
              <th>Fecha Creacion</th>
              <th>Fecha Actualizacion</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((client, index) => {
              return (
                <tr key={index}>
                  <td>{client.id}</td>
                  <td>
                    {client.first_name} {client.lastName}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.adress}</td>
                  <td>{client.province}</td>
                  <td>{client.state}</td>
                  <td>{client.fecha_nac}</td>
                  <td>{client.fecha_creacion}</td>
                  <td>{client.fecha_actualizacion}</td>
                  <td>{client.rol}</td>
                  <td>{client.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(client.id)}
                    >
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
      {showCreateModal && <ModalCreateUserForm closeModal={closeModal} />}
    </div>
  );
}
