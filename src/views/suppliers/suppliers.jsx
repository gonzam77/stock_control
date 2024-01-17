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
              <th>Razon Social</th>
              <th>Cuil</th>
              <th>Email</th>
              <th>Telefono</th>
              <th>Direccion</th>
              <th>Localidad</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier, index) => {
              return (
                <tr key={index}>
                  <td>{supplier.razon_social}</td>
                  <td>{supplier.cuil}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>{supplier.adress}</td>
                  <td>{supplier.state}{', '}{supplier.province}</td>
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
