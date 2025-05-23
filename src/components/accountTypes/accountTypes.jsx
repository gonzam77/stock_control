import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalEditAccountTypeForm from '../../views/modals/editModals/modalEditAccountTypeForm/modalEditAcountTypeForm';
import ModalCreateAccountTypeForm from '../../views/modals/createModals/modalCreateAccountTypeForm/modalCreateAccountTypeForm'
import styles from './accountTypes.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";

export default function AccountTypes() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalEditAccountType = useSelector((state) => state.showModalEditAccountType);
  const accountTypes = useSelector((state) => state.accountTypes);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModalEditAccountType());
    dispatch(actions.getAccountTypeId(id));
  };

  useEffect(()=>{
    if(!accountTypes.length) dispatch(actions.getAllAccountTypes());
  },[accountTypes, dispatch])
  
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
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Descripcion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {accountTypes?.map((account, index) => {
              return (
                <tr key={index}>
                  <td>{account.DESCRIPCION}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(account.ID_TIPO_CUENTA)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalEditAccountType && <ModalEditAccountTypeForm />} 
      {showCreateModal && <ModalCreateAccountTypeForm />}
    </div>
  );
}
