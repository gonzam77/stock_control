import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateCategoryForm from '../../views/modals/createModals/modalCreateCategory/modalCreateCategory';
import ModalEditCategoryForm from '../../views/modals/editModals/modalEditCategoryForm/modalEditCategory';
import styles from './categories.module.css';
import * as actions from '../../redux/actions';

export default function Categories() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalCategories = useSelector((state) => state.showModalCategories);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModalCategories());
    dispatch(actions.getCategoryId(id));
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
          Cargar Nueva Categoria
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Categorias</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.name}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(category.id)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalCategories && <ModalEditCategoryForm />} 
      {showCreateModal && <ModalCreateCategoryForm />}
    </div>
  );
}
