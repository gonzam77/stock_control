import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

function DropdownStatus({ onSelect, initialValue }) {

  const [select, setSelect] = useState(initialValue);

  function handleSelect(eventKey) {
    setSelect(initialValue);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Estado"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={"Activo"}>Activo</Dropdown.Item>
        <Dropdown.Item eventKey={"Inactivo"}>Inactivo</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownStatus;
