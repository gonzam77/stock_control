import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateRolForm from '../../views/modals/createModals/modalCreateUserRolForm/modalCreateUserRolForm';
import ModalEditUserRolForm from '../../views/modals/editModals/modalEditUserRolForm/modalEditUserRolForm';
import styles from './roles.module.css';
import * as actions from '../../redux/actions';

export default function Roles() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalEditUserRol = useSelector((state) => state.showModalEditUserRol);

  const roles = useSelector((state) => state.roles);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModalEditUserRol());
    dispatch(actions.getRolId(id));
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
          Cargar Nuevo Rol
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
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((rol, index) => {
              return (
                <tr key={index}>
                  <td>{rol.NOMBRE}</td>
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
      {showModalEditUserRol && <ModalEditUserRolForm />}
      {showCreateModal && <ModalCreateRolForm />}
    </div>
  );
}
