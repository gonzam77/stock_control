import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import styles from "../editForms.module.css";
import DropdownRoles from "../../../dropdown/dropdownRol";
import DropdownStatus from "../../../dropdown/dropdownStatus";

export default function EditUserForm() {
  const users = useSelector((state) => state.users);
  const userId = useSelector((state) => state.userId);
  const dispatch = useDispatch();
  const selectedUser = users.find((element) => element.id === userId);

  const [user, setUser] = useState(selectedUser);

  const cancelModal = () => {
    dispatch(actions.hideModal());
  }

  const closeModal = (event) => {
    event.preventDefault();
    dispatch(actions.editUser(user));
    dispatch(actions.hideModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setUser({
      ...user,
      [target]: value
    });
  };

  const handleRolesSelect = (selectedRol) => {
    setUser({
      ...user,
      rol: selectedRol,
    });
  };

  const handleStatusSelect = (selectedStatus) => {
    setUser({
      ...user,
      status: selectedStatus,
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.divs}>
          <label>NOMBRE</label>
          <input
            autoComplete="off"
            name="NOMBRE"
            value={user.adress}
            onChange={handleChange}
            placeholder={selectedUser.NOMBRE}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect}></DropdownStatus>
        </div>
        <div className="modal-footer">
          <Button variant="danger" onClick={cancelModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={closeModal} >
            Confirmar
          </Button>
        </div>
      </form>
    </div>
  );
}
