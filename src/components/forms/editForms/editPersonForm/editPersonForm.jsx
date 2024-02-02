import { useState } from "react";
import { backURL } from "../../../../App";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import styles from "../editForms.module.css";
import axios from "axios";
import * as actions from "../../../../redux/actions";

export default function EditpersonForm() {
  const persons = useSelector((state) => state.persons);
  const personId = useSelector((state) => state.personId);
  const dispatch = useDispatch();
  const selectedlPerson = persons.find((element) => element.ID_PERSONA === personId);

  const [person, setPerson] = useState(selectedlPerson);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };


  async function putPerson(persona){
    try {
        await axios.put(`${backURL}/persona/update`, persona)
    } catch (error) {
        console.log(error);
    }
  }

  const closeModal = async (event) => {
    event.preventDefault();
    await putPerson({Persona: person})
    dispatch(actions.cleanPerson());
    dispatch(actions.hideModal());
  };

 

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setPerson({
      ...person,
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
            value={person.NOMBRE}
            onChange={handleChange}
            placeholder={selectedlPerson.NOMBRE}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="APELLIDO"
            value={person.APELLIDO}
            onChange={handleChange}
            placeholder={selectedlPerson.APELLIDO}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>DNI</label>
          <input
            autoComplete="off"
            name="DNI"
            value={person.DNI}
            onChange={handleChange}
            placeholder={selectedlPerson.DNI}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="EMAIL"
            value={person.EMAIL}
            onChange={handleChange}
            placeholder={selectedlPerson.EMAIL}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="TELEFONO"
            value={person.TELEFONO}
            onChange={handleChange}
            placeholder={selectedlPerson.TELEFONO}
            type="text"
          />
        </div>
        <div class="modal-footer">
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
