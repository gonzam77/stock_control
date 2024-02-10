import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateRolForm from '../../views/modals/createModals/modalCreateUserRolForm/modalCreateUserRolForm';
import ModalEditUserRolForm from '../../views/modals/editModals/modalEditUserRolForm/modalEditUserRolForm';
import styles from './roles.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";

export default function Roles() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalEditUserRol = useSelector((state) => state.showModalEditUserType);
  const userTypes = useSelector((state) => state.userTypes);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(!userTypes.length) dispatch(actions.getAllUserTypes());
  },[userTypes, dispatch])


  const openModal = async (id) => {
    dispatch(actions.showModalEditUserType());
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
        <h1>Tipo de Usuarios</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Ver</th>
              <th>Crear</th>
              <th>Modificar</th>
              <th>Eliminar</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {userTypes?.map((userType, index) => {
              return (
                <tr key={index}>
                  <td>{userType.DESCRIPCION}</td>
                  <td>{userType.READ === 1 ? 'Si': 'No'}</td>
                  <td>{userType.CREATE === 1 ? 'Si': 'No'}</td>
                  <td>{userType.UPDATE === 1 ? 'Si': 'No'}</td>
                  <td>{userType.DELETE === 1 ? 'Si': 'No'}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(userType.ID_TIPO_USUARIO)}>
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
