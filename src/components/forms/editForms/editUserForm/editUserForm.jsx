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
      [target]:value
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
          <label>Nombre</label>
          <input
            autoComplete="off"
            name="first_name"
            value={user.first_name}
            onChange={handleChange}
            placeholder={selectedUser.first_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="last_name"
            value={user.last_name}
            onChange={handleChange}
            placeholder={selectedUser.last_name}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={user.cuil}
            onChange={handleChange}
            placeholder={selectedUser.cuil}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={user.adress}
            onChange={handleChange}
            placeholder={selectedUser.adress}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={user.adress}
            onChange={handleChange}
            placeholder={selectedUser.phone}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={user.province}
            onChange={handleChange}
            placeholder={selectedUser.province}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={user.adress}
            onChange={handleChange}
            placeholder={selectedUser.state}
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect}></DropdownStatus>
        </div>
        <div class="modal-footer">
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
