import { useState } from "react";
import styles from "../createFomrs.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import DropdownRoles from "../../../dropdown/dropdownRol";
import DropdownStatus from "../../../dropdown/dropdownStatus";

export default function CreateUserForm() {
  const dispatch = useDispatch();

  const [newUser, setNewUser] = useState({
    id: "",
    first_name: "",
    last_name: "",
    cuil: "",
    state: "",
    province: "",
    phone: "",
    email: "",
    adress: "",
    create_date: "",
    rol: "",
    status: "",
  });

  const closeCreateModal = (event) => {
    event.preventDefault();
    const date = new Date();
    setNewUser({
      ...newUser,
      create_date: date,
    });
    dispatch(actions.createUser(newUser));
    dispatch(actions.hideCreateModal());
  };

  const cancelCreateModal = () => {
    dispatch(actions.hideCreateModal());
  };

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setNewUser({
      ...newUser,
      [target]: value,
    });
  }

  const handleRolesSelect = (selectedRol) => {
    setNewUser({
      ...newUser,
      rol: selectedRol,
    });
  };
  const handleStatusSelect = (selectedStatus) => {
    setNewUser({
      ...newUser,
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
            value={newUser.first_name}
            onChange={handleChange}
            placeholder="Nombre..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Apellido</label>
          <input
            autoComplete="off"
            name="last_name"
            value={newUser.last_name}
            onChange={handleChange}
            placeholder="Apellido..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Cuil</label>
          <input
            autoComplete="off"
            name="cuil"
            value={newUser.cuil}
            onChange={handleChange}
            placeholder="cuil..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Direccion</label>
          <input
            autoComplete="off"
            name="adress"
            value={newUser.adress}
            onChange={handleChange}
            placeholder="Barrio..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Email</label>
          <input
            autoComplete="off"
            name="email"
            value={newUser.email}
            onChange={handleChange}
            placeholder="example@ejem.com.ar"
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Telefono</label>
          <input
            autoComplete="off"
            name="phone"
            value={newUser.phone}
            onChange={handleChange}
            placeholder="266..."
            type="text"
          />
        </div>
        <div className={styles.divs}>
          <label>Provincia</label>
          <input
            autoComplete="off"
            name="province"
            value={newUser.province}
            onChange={handleChange}
            placeholder="San Luis..."
            type="date"
          />
        </div>
        <div className={styles.divs}>
          <label>Localidad</label>
          <input
            autoComplete="off"
            name="state"
            value={newUser.state}
            onChange={handleChange}
            placeholder="San Luis..."
          />
        </div>
        <div className={styles.divs}>
          <DropdownRoles onSelect={handleRolesSelect}></DropdownRoles>
        </div>
        <div className={styles.divs}>
          <DropdownStatus onSelect={handleStatusSelect}></DropdownStatus>
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
