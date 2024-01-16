import styles from "./deposits.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreatedepositForm from "../modals/createModals/modalCreateDepositForm/modalCreateDepositForm";
import ModalEditdepositForm from "../modals/editModals/modalEditDepositForm/modalEditDepositForm";
import { Button } from "react-bootstrap";

export default function Deposits() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const deposits = useSelector((state) => state.deposits);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getDepositId(id));
  };

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

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
        <h1>Depositos</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Administrador</th>
              <th>Descripcion</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit, index) => {
              return (
                <tr key={index}>
                  <td>{deposit.id}</td>
                  <td>{deposit.type}</td>
                  <td>{deposit.name}</td>
                  <td>{deposit.admin}</td>
                  <td>{deposit.description}</td>
                  <td>{deposit.phone}</td>
                  <td>{deposit.adress}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(deposit.id)}
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
      {showModalState && <ModalEditdepositForm closeModal={closeModal} />}
      {showCreateModal && <ModalCreatedepositForm closeModal={closeModal} />}
    </div>
  );
}
