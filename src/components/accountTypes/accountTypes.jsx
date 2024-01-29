import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalEditAccountTypeForm from '../../views/modals/editModals/modalEditAccountTypeForm/modalEditAcountTypeForm';
import ModalCreateAccountTypeForm from '../../views/modals/createModals/modalCreateAccountTypeForm/modalCreateAccountTypeForm'
import styles from './accountTypes.module.css';
import * as actions from '../../redux/actions';

export default function AccountTypes() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalAccountType = useSelector((state) => state.showModalAccountType);
  const accountTypes = useSelector((state) => state.accountTypes);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModalAccountType());
    dispatch(actions.getAccountTypeId(id));
  };
  
  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
          Cargar Cuenta
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Tipo de Cuentas</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {accountTypes.map((account, index) => {
              return (
                <tr key={index}>
                  <td>{account.description}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(account.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalAccountType && <ModalEditAccountTypeForm />} 
      {showCreateModal && <ModalCreateAccountTypeForm />}
    </div>
  );
}
