import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditcategoryForm() {
  const categories = useSelector((state) => state.categories);
  const categoryId = useSelector((state) => state.categoryId);
  const dispatch = useDispatch();
  const selectedCategory = categories.find((element) => element.id === categoryId);

  const [category, setCategory] = useState(selectedCategory);

  const cancelModal = () => {
    dispatch(actions.hideModalCategories());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModalCategories());
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
            name="name"
            value={category.name}
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
