import styles from "./users.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreateUserForm from "../modals/createModals/modalCreateUserForm/modalCreateUserForm";
import ModalEditUserForm from "../modals/editModals/modalEditUserForm/modalEditUserForm";
import { Button } from "react-bootstrap";
import { useEffect } from "react";

export default function Users() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users.length === 0) {
      dispatch(actions.getAllUsers());
    }
  }, [users, dispatch]);


  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getUserId(id));
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
        <h1>Usuarios</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre Usuario</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => {

              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{user.NOMBRE}</td>
                  <td>{user.PERSONA.NOMBRE}{' '}{user.PERSONA.APELLIDO}</td>
                  <td>{user.PERSONA.EMAIL}</td>
                  <td>{user.PERSONA.TELEFONO}</td>
                  <td>{user.TIPO_USUARIO.DESCRIPCION}</td>
                  <td>{user.ESTADO === 1 ? 'Activo' : 'Inactivo'}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(user.ID_USUARIO)}
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
      {showModalState && <ModalEditUserForm closeModal={closeModal} />}
      {showCreateModal && <ModalCreateUserForm closeModal={closeModal} />}
    </div>
  );
}
