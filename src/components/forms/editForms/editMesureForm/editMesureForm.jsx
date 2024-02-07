import { useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";

export default function EditMesureForm() {
  const mesures = useSelector((state) => state.mesures);
  const mesureId = useSelector((state) => state.mesureId);
  const dispatch = useDispatch();
  const selectedMesure = mesures.find((element) => element.id === mesureId);

  const [mesure, setMesure] = useState(selectedMesure);

  const cancelModal = () => {
    dispatch(actions.hideModalEditMesure());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModalEditMesure());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setMesure({
      ...mesure,
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
            value={mesure.name}
            onChange={handleChange}
            placeholder={selectedMesure.name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Abreviacion</label>
          <input
            autoComplete="off"
            name="abbreviation"
            value={mesure.abbreviation}
            onChange={handleChange}
            placeholder={selectedMesure.description}
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
