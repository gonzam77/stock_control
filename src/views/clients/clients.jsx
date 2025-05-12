import styles from "./clients.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditClientForm from "../modals/editModals/modalEditClientForm/modalEditClientForm";
import ModalCreateClientForm from "../modals/createModals/modalCreateClientForm/modaleCreateClientForm";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export default function Clients() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector(state => state.showCreateModal)
  const clients = useSelector((state) => state.clients);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getClientId(id));
  };

  useEffect(()=>{
    if(!clients.length) dispatch(actions.getAllClients())
  },[clients, dispatch])

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
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Cuil</th>
              <th>Razon Social</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client, index) => {
              return (
                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                  <td>{client.CUIL}</td>
                  <td>{client.RAZON_SOCIAL}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(client.ID_CLIENTE)}>
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
