import styles from "./deposits.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalCreatedepositForm from "../modals/createModals/modalCreateDepositForm/modalCreateDepositForm";
import ModalEditdepositForm from "../modals/editModals/modalEditDepositForm/modalEditDepositForm";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function Deposits() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const deposits = useSelector((state) => state.deposits);
  const ubications = useSelector((state) => state.ubications);
  const dispatch = useDispatch();

  
  useEffect(()=>{
    if(!deposits.length) dispatch(actions.getAllDeposits());
    if(!ubications.length) dispatch(actions.getAllUbications());
  },[deposits, dispatch, ubications])
  
  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getDepositId(id));
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
        <h1>Depositos</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>VER</th>
              <th>Tipo</th>
              <th>Nombre</th>
              <th>Administrador</th>
              <th>Descripcion</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit, index) => {
              const ubicacion = ubications?.find(e=>e.ID_UBICACION === deposit.ID_UBICACION);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td style={{ textAlign: "center" }}>
                    <Link to={`/depositDetail/${deposit.ID_BODEGA}`}>
                      <Button variant="primary">VER</Button>
                    </Link>
                  </td>
                  <td>{deposit.TIPO_BODEGA}</td>
                  <td>{deposit.NOMBRE}</td>
                  <td>{deposit.ADMINISTRADOR}</td>
                  <td>{deposit.DESCRIPCION}</td>
                  <td>{deposit.TELEFONO}</td>
                  <td>{ubicacion?.DIRECCION}</td>
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(deposit.ID_BODEGA)}
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
      {showModalState && <ModalEditdepositForm closeModal={closeModal} />}
      {showCreateModal && <ModalCreatedepositForm closeModal={closeModal} />}
    </div>
  );
}
