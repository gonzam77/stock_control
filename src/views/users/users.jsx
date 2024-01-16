import styles from "./users.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreateUserForm from "../modals/createModals/modalCreateUserForm/modalCreateUserForm";
import ModalEditUserForm from "../modals/editModals/modalEditUserForm/modalEditUserForm";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

export default function Users() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const users = useSelector((state) => state.users);
  const selectedUser = useSelector((state) => state.selectedUser);
  const dispatch = useDispatch();

  const [user, setUser] = useState(selectedUser);

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

  const checkedHandler = (event) => {
    console.log(event);
    if (event === true) {
      setUser({
        ...user,
        status: "Activo",
      });
    } else {
      setUser({
        ...user,
        status: "Inactivo",
      });
    }
    dispatch(actions.editUser());
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
              <th>id</th>
              <th>Nombre</th>
              <th>Cuil</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Localidad</th>
              <th>Cargo</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>
                    {user.first_name} {user.lastName}
                  </td>
                  <td>{user.cuil}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.adress}</td>
                  <td>
                    {user.province}
                    {", "}
                    {user.state}
                  </td>
                  <td>{user.rol}</td>
                  <td>{user.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(user.id)}
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
