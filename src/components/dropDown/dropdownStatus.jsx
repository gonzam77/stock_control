import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

function DropdownStatus({ onSelect }) {
  const [select, setSelect] = useState();

  function handleSelect(eventKey) {
    setSelect(eventKey);
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
