import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import { axiosConfig, backURL } from "../../../../App";
import axios from "axios";
import Swal from 'sweetalert2'


export default function EditcategoryForm() {
  const categories = useSelector((state) => state.categories);
  const categoryId = useSelector((state) => state.categoryId);
  const dispatch = useDispatch();
  const selectedCategory = categories.find((element) => element.ID_CATEGORIA === categoryId);
  const [category, setCategory] = useState(selectedCategory);

  useEffect(() => {
    if (!categories.length) dispatch(actions.getAllCategories());
  }, [categories, dispatch]);

  async function putCategory(categoria) {
    try {
      await axios.put(`${backURL}/categoria/update`, categoria, axiosConfig)
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.response.data.Message,
        icon: 'error',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#0a7f02',
        keydownListenerCapture: false
      });
      console.log(error);
    }
  }

  const cancelModal = () => {
    dispatch(actions.hideModalEditCategories());
  };

  const closeModal = async (event) => {
    event.preventDefault();
    await putCategory({ Categoria: category });
    dispatch(actions.cleanCategories());
    dispatch(actions.hideModalEditCategories());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setCategory({
      ...category,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={category.NOMBRE}
            onChange={handleChange}
            placeholder={selectedCategory.name}
            type="text"
          />
        </div>
        <div className="modal-footer">
          <Button variant="danger" onClick={cancelModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeModal}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
