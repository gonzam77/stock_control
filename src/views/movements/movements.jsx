import styles from "./movements.module.css";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import DropdownDeposit from "../../components/dropdown/dropdownDeposit";
import DropdownMovementType from "../../components/dropdown/dropdownMovementType";
import DropdownUser from "../../components/dropdown/dropdownUser";
import { useState } from "react";

export default function Movements() {
  const movements = useSelector((state) => state.movements);
  // const deposits = useSelector((state) => state.deposits);
  // const products = useSelector((state) => state.products);

  const [code, setCode] = useState({
    code: "",
  });

  function handleDeposit() {}

  function handleCodeFilter() {}

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleCodeFilter();
    }
  };

  function handleChange(event) {
    const target = event.target.name;
    let value = event.target.value;
    setCode({
      ...code,
      [target]: value,
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>Movimientos</h1>
      </div>
      <div className={styles.titleContainer}>
        <div>
          <DropdownDeposit onSelect={handleDeposit}></DropdownDeposit>
        </div>
        <div>
          <DropdownMovementType onSelect={handleDeposit}></DropdownMovementType>
        </div>
        <div>
          <DropdownUser onSelect={handleDeposit}></DropdownUser>
        </div>
        <div className={styles.input}>
          <label>
            <b>Filtrar Producto</b>
          </label>
          <input
            onKeyDown={handleKeyDown}
            autoComplete="off"
            name="code"
            value={code.code}
            onChange={handleChange}
            placeholder="Codigo..."
            type="text"
          />
        </div>
      </div>
      <div className={styles.tableContainer}>
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Numero Movimiento</th>
              <th>Deposito</th>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Marca</th>
              <th>Cantidad</th>
              <th>Tipo Movimiento</th>
              <th>Numero</th>
            </tr>
          </thead>
          <tbody>
            {movements?.map((element, index) => {
              // const deposit = deposits.find((e) => e.id === element.deposit);
              // const product = products.find((e) => e.code === element.product);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{element.id}</td>
                  <td>{element.name}</td>
                  <td>{element.code}</td>
                  <td>{element.name}</td>
                  <td>{element.brand}</td>
                  <td>{element.quantity}</td>
                  <td>{element.type}</td>
                  <td>{element.number}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
