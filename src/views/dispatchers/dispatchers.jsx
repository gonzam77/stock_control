import styles from "./dispatchers.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
// import ModalEditdispatcherForm from "../modals/editModals/modalEditdispatcherForm/modalEditdispatcherForm";
// import ModalCreatedispatcherForm from "../modals/createModals/modalCreatedispatcherForm/modaleCreatedispatcherForm";
import { Button } from "react-bootstrap";

export default function Dispatchers() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector(state => state.showCreateModal)
  const dispatchers = useSelector((state) => state.dispatchers);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getDispatcherId(id));
  };

  const openCreateModal = () => {
    dispatch(actions.showCreateModal())
  }

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button className={styles.createButton} variant="success" onClick={openCreateModal}>
          Cargar Nuevo
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Transportistas</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Fecha Nacimiento</th>
              <th>Fecha Creacion</th>
              <th>Fecha Actualizacion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {dispatchers.map((dispatcher, index) => {
              return (
                <tr key={index}>
                  <td>{dispatcher.id}</td>
                  <td>
                    {dispatcher.first_name} {dispatcher.lastName}
                  </td>
                  <td>{dispatcher.email}</td>
                  <td>{dispatcher.phone}</td>
                  <td>{dispatcher.adress}</td>
                  <td>{dispatcher.province}</td>
                  <td>{dispatcher.state}</td>
                  <td>{dispatcher.fecha_nac}</td>
                  <td>{dispatcher.fecha_creacion}</td>
                  <td>{dispatcher.fecha_actualizacion}</td>
                  <td>
                    <Button variant="primary" onClick={() => openModal(dispatcher.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalState && <ModalEditDispatcherForm closeModal={closeModal} />}
      {showCreateModal && <ModalCreateDispatcherForm />}
    </div>
  );
}
