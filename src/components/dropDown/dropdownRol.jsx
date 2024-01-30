import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

function DropdownRoles({ onSelect }) {
  
  const [select, setSelect] = useState();
  const roles = useSelector(state => state.roles);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        {select ? select : "Tipo de Usuario"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item eventKey={'No asignado'}>No asignado</Dropdown.Item>
        {roles.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.name}>
              {element.DESCRIPCION}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownRoles;
