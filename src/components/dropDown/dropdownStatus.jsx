import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

function DropdownStatus({ onSelect }) {
  const [select, setSelect] = useState();
  const roles = useSelector((state) => state.roles);

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
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
