import styles from "./account.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreateAccountForm from "../modals/createModals/modalCreateAccountForm/modalCreateAccountForm";
import ModalEditAccountForm from "../modals/editModals/modalEditAccountForm/modalEditAccountForm";
import { Button } from "react-bootstrap";

export default function Account() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const accounts = useSelector((state) => state.accounts);
  const accountTypes = useSelector((state) => state.accountTypes);
  const dispatch = useDispatch();


  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getAccountId(id));
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
        <h1>Cuentas</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tipo de Cuenta</th>
              <th>Descripcion</th>
              <th>Numero de Cuenta</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {accounts?.map((account, index) => {
                const accountType = accountTypes.find(e => e.id === account.account_type)
              return (
                <tr key={index} style={{textAlign: 'center', verticalAlign: 'middle'}}>
                  <td>{accountType.description}</td>
                  <td>{account.description}</td>
                  <td>{account.number}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(account.id)}
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
      {showModalState && <ModalEditAccountForm />}
      {showCreateModal && <ModalCreateAccountForm  />}
    </div>
  );
}
