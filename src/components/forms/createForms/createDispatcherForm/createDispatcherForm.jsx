import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownPersona from "../../../dropdown/dropdownPerson";


export default function CreateDispatcherForm() {
  
  const dispatch = useDispatch();
  const personas = useSelector((state) => state.personas);

  
  const [newDispatcher, setnewDispatcher] = useState({
    id:'',
    first_name: "",
    last_name: "",
    cuil: "",
    state: "",
    province: "",
    phone: "",
    email: "",
    adress: "",
    razon_social: "",
    create_date:''
  });
  
  const closeCreateModal = (event) => {
    event.preventDefault();
    setnewDispatcher({
      ...newDispatcher,
    })
    dispatch(actions.createDispatcher(newDispatcher));
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }

  function handlePersonaSelect(selectedPerson) {
    const personId = personas.find((e) => e.DNI === selectedPerson).ID_PERSONA;
    setnewDispatcher({
      ...newDispatcher,
      ID_PERSONA: personId,
    });
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
      <div className={styles.divs}>
          <DropdownPersona onSelect={handlePersonaSelect}></DropdownPersona>
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
