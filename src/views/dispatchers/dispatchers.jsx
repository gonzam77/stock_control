import styles from "./dispatchers.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditDispatcherForm from "../modals/editModals/modalEditDispatcherForm/modalEditDispatcherForm";
import ModalCreateDispatcherForm from '../modals/createModals/modalCreateDispatcherForm/modalCreateDispatcherForm';
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
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {dispatchers?.map((dispatcher, index) => {
              return (
                <tr key={index} style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(dispatcher?.id)}>
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
