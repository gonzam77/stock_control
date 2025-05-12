import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateMesureForm from '../../views/modals/createModals/modalCreateMesureForm/ModalCreateMesureForm';
import ModalEditMesureForm from '../../views/modals/editModals/modalEditMesureForm/modalEditMesureForm';
import styles from './mesures.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";


export default function Mesures() {
  const showCreateModalMesures = useSelector((state) => state.showCreateModal);
  const showModalEditMesure = useSelector((state) => state.showModalEditMesure);
  const mesures = useSelector((state) => state.mesures);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!mesures.length) dispatch(actions.getAllMesures())
  },[mesures, dispatch])

  const openModal = (id) => {
    dispatch(actions.showModalEditMesure())
    dispatch(actions.getMesureId(id))
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
          Cargar Nueva Unidad de Medida
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Unidad de Medida</h1>
      </div>
      <div className={styles.tableContainer}>
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Abrebiatura</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {mesures?.map((mesure, index) => {
              return (
                <tr key={index}>
                  <td>{mesure.NOMBRE}</td>
                  <td>{mesure.ABREVIATURA}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(mesure.ID_UNIDAD_MEDIDA)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalEditMesure && <ModalEditMesureForm />}
      {showCreateModalMesures && <ModalCreateMesureForm />}
    </div>
  );
}
