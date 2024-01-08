import { useState } from "react";
import styles from "./supplierForm.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../../redux/actions";
import { Button } from "react-bootstrap";

export default function SupplierForm() {
  const suppliers = useSelector((state) => state.suppliers);
  const supplierId = useSelector((state) => state.supplierId);
  const dispatch = useDispatch();
  const selectedSupplier = suppliers.find(
    (element) => element.id === supplierId
  );

  const [supplier, setSupplier] = useState({ suppliers });

  function handleSubmit(event) {
    event.preventDefault();
    dispatch(actions.editSupplier(supplier));
  }

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;

    const editedSuppliers = suppliers.map((element) => {
      if (element.id === supplierId) {
        element[target] = value;
      }
      return element;
    });

    setSupplier({ editedSuppliers });
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nombre</label>
        <br></br>
        <input
          autoComplete="off"
          name="name"
          value={supplier.first_name}
          onChange={handleChange}
          placeholder={selectedSupplier.first_name}
          type="text"
        />
        <br></br>

        <label>Apellido</label>
        <br></br>
        <input
          autoComplete="off"
          name="lastName"
          value={supplier.lastName}
          onChange={handleChange}
          placeholder={selectedSupplier.lastName}
          type="text"
        />
        <br></br>

        <label>Genero</label>
        <br></br>
        <input
          autoComplete="off"
          name="marca"
          value={supplier.genero}
          onChange={handleChange}
          placeholder={selectedSupplier.genero}
          type="text"
        />
        <br></br>

        <label>Direccion</label>
        <br></br>
        <input
          autoComplete="off"
          name="adress"
          value={supplier.adress}
          onChange={handleChange}
          placeholder={selectedSupplier.adress}
          type="text"
        />
        <br></br>

        <label>Telefono</label>
        <br></br>
        <input
          autoComplete="off"
          name="phone"
          value={supplier.adress}
          onChange={handleChange}
          placeholder={selectedSupplier.phone}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Provincia</label>
        <br></br>
        <input
          autoComplete="off"
          name="province"
          value={supplier.province}
          onChange={handleChange}
          placeholder={selectedSupplier.province}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Localidad</label>
        <br></br>
        <input
          autoComplete="off"
          name="state"
          value={supplier.adress}
          onChange={handleChange}
          placeholder={selectedSupplier.state}
          type="text"
        />
        <br></br>
        <br></br>
        <label>Fecha de Nacimiento</label>
        <br></br>
        <input
          autoComplete="off"
          name="fecha_nac"
          value={supplier.adress}
          onChange={handleChange}
          type="date"
        />
        <br></br>
        <br></br>

        <Button variant="info" type="submit">
          Guardar
        </Button>
      </form>
    </div>
  );
}
