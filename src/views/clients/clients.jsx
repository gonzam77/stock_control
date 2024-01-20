import styles from "./clients.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditClientForm from "../modals/editModals/modalEditClientForm/modalEditClientForm";
import ModalCreateClientForm from "../modals/createModals/modalCreateClientForm/modaleCreateClientForm";
import { Button } from "react-bootstrap";

export default function Clients() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector(state => state.showCreateModal)
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getClientId(id));
  };

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
        <h1>Clientes</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Cuil</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Localidad</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index) => {
              return (
                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                  <td>{client.cuil}</td>
                  <td>
                    {client.first_name} {client.last_name}
                  </td>
                  <td>{client.email}</td>
                  <td>{client.phone}</td>
                  <td>{client.adress}</td>
                  <td>{client.state}{', '}{client.province}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(client.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalState && <ModalEditClientForm />}
      {showCreateModal && <ModalCreateClientForm />}
    </div>
  );
}
