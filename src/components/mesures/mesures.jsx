import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import NomenclatorsModal from "../../views/modals/nomenclatorsModal/nomenclatorsModal";
import styles from "../../views/clients/clients.module.css";
import CreateUsermesure from "../forms/createForms/createUsermesure/createUsermesure";

export default function Mesures() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalState = useSelector((state) => state.showModalState);
  const mesures = useSelector((state) => state.mesures);

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
        <h1>Unidad de Medida</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Abrebiatura</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {mesures.map((mesure, index) => {
              return (
                <tr key={index}>
                  <td>{mesure.name}</td>
                  <td>{mesure.abbreviation}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(mesure.id)}>
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
      {showCreateModal && <NomenclatorsModal form={CreateUsermesure} />}
    </div>
  );
}
