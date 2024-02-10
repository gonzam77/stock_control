import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateUbicationForm from '../../views/modals/createModals/modalCreateUbicationForm/modalCreateUbicationForm';
import ModalEditUbicationForm from '../../views/modals/editModals/modalEditUbicationForm/modalEditUbicationForm';
import styles from './ubications.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";


export default function Ubications() {
  const showCreateModalMesures = useSelector((state) => state.showCreateModal);
  const showModalEditUbication = useSelector((state) => state.showModalEditUbication);
  const ubications = useSelector((state) => state.ubications);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!ubications.length) dispatch(actions.getAllUbications())
  },[ubications, dispatch])

  const openModal = (id) => {
    dispatch(actions.showModalEditUbication())
    dispatch(actions.getUbicationId(id))
  };

  const openCreateModal = () => {
    dispatch(actions.showCreateModal())
  }

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
          Cargar Nueva Ubicacion
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Ubicaciones</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Direccion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {ubications?.map((ubication, index) => {
              return (
                <tr key={index}>
                  <td>{ubication.PROVINCIA}</td>
                  <td>{ubication.LOCALIDAD}</td>
                  <td>{ubication.DIRECCION}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(ubication.ID_UBICACION)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalEditUbication && <ModalEditUbicationForm />}
      {showCreateModalMesures && <ModalCreateUbicationForm />}
    </div>
  );
}
