import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export default function DropdownMovementType({ onSelect }) {
  const [select, setSelect] = useState();

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Tipo de Movimiento"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey="venta">Venta</Dropdown.Item>;
        <Dropdown.Item eventKey="compra">Compra</Dropdown.Item>;
        <Dropdown.Item eventKey="ajuste">Ajuste</Dropdown.Item>;
        <Dropdown.Item eventKey="transferencia">Transferencia</Dropdown.Item>;
      </Dropdown.Menu>
    </Dropdown>
  );
}
