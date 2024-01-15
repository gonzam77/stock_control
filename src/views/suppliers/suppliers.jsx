import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import styles from "./suppliers.module.css";
import Table from "react-bootstrap/Table";
import ModalEditSuppliersForm from "../modals/editModals/modalSupplierForm/modalSupllierForm";
import * as actions from "../../redux/actions";
import ModalCreateSuppliersForm from '../modals/createModals/ModalCreteSupplierForm/modalCreateSupplierForm';

export default function Suppliers() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModalState = useSelector((state) => state.showCreateModal);
  const suppliers = useSelector((state) => state.suppliers);
  const supplierId = useSelector((state) => state.supplierId);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getSupplierId(id));
  };

  const openCreateSupplierModal = () => {
    dispatch(actions.showCreateModal());
  }

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button className={styles.createButton} variant="success" onClick={openCreateSupplierModal}>
          Cargar Nuevo
        </Button>
      </div>
      <div className={styles.title}>
        <h1>Proveedores</h1>
      </div>

      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>id</th>
              <th>Razon Social</th>
              <th>Cuil</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Provincia</th>
              <th>Localidad</th>
              <th>Fecha Creacion</th>
              <th>Fecha Actualizacion</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => {
              return (
                <tr key={index}>
                  <td>{supplier.id}</td>
                  <td>{supplier.razon_social}</td>
                  <td>{supplier.cuil}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.adress}</td>
                  <td>{supplier.province}</td>
                  <td>{supplier.state}</td>
                  <td>{supplier.fecha_creacion}</td>
                  <td>{supplier.fecha_actualizacion}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(supplier.id)}
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
      {showModalState && <ModalEditSuppliersForm id={supplierId} closeModal={closeModal} />}
      {showCreateModalState && <ModalCreateSuppliersForm closeModal={closeModal} />}
    </div>
  );
}
