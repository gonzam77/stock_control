import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
//import Swal from 'sweetalert2';

export default function CreateDispatcherForm() {
  
  const dispatch = useDispatch();
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
    dispatch(actions.hideCreateModal());
  };
  
  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  }

  return (
    <div className={styles.container}>
      <form className={styles.form}>
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
