import { useState } from "react";
import styles from "../editForms.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownPersona from "../../../dropdown/dropdownPerson";


export default function EditDispatcherForm() {
  const dispatchers = useSelector((state) => state.dispatchers);
  const dispatcherId = useSelector((state) => state.dispatcherId);
  const personas = useSelector((state) => state.personas);
  const dispatch = useDispatch();
  const selectedlDispatcher = dispatchers.find(
    (element) => element.id === dispatcherId
  );

  const [dispatcher, setDispatcher] = useState(selectedlDispatcher);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  };

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.hideModal());
  };

  function handlePersonaSelect(selectedPerson) {
    if(selectedPerson !== '0') {
      const personId = personas?.find((e) => e.NOMBRE === selectedPerson).ID_PERSONA;
      setDispatcher({
        ...dispatcher,
        ID_PERSONA: personId,
      });
    } else {
      setDispatcher({
        ...dispatcher,
        ID_PERSONA: selectedPerson,
      });
    }
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <DropdownPersona onSelect={handlePersonaSelect}></DropdownPersona>
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
