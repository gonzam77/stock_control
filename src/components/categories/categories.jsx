import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateCategoryForm from '../../views/modals/createModals/modalCreateCategoryForm/modalCreateCategoryForm';
import ModalEditCategoryForm from '../../views/modals/editModals/modalEditCategoryForm/modalEditCategory';
import styles from './categories.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";

export default function Categories() {
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const showModalEditCategories = useSelector((state) => state.showModalEditCategories);
  const categories = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!categories.length) dispatch(actions.getAllCategories());
  },[categories, dispatch])

  const openModal = (id) => {
    dispatch(actions.showModalEditCategories());
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
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.NOMBRE}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button variant="primary" onClick={() => openModal(category.ID_CATEGORIA)}>
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalEditCategories && <ModalEditCategoryForm />} 
      {showCreateModal && <ModalCreateCategoryForm />}
    </div>
  );
}
