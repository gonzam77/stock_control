import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { backURL } from "../../../../App";

export default function CreateCategoryForm() {
  const dispatch = useDispatch();
  const [newCategory, setNewCategory] = useState({
    NOMBRE: "",
  });

  async function postCategory(categoria){
    try {
      await axios.post(`${backURL}/categoria/nuevo`, categoria)
    } catch (error) {
      console.log(error);
    }
  }

  const closeCreateModal = async (event) => {
    event.preventDefault();
    await postCategory({ Categoria: newCategory});
    dispatch(actions.cleanCategories())
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewCategory({
      ...newCategory,
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
            value={newCategory.NOMBRE}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className="modal-footer">
          <Button variant="danger" onClick={cancelCreateModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeCreateModal}>
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
