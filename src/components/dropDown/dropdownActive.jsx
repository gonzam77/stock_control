import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export default function DropdownActive({ onSelect }) {
  
  const [select, setSelect] = useState();
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Estado"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
            <Dropdown.Item eventKey='Active'> Activo </Dropdown.Item>
            <Dropdown.Item eventKey='Inactive'> Inactivo </Dropdown.Item>        
      </Dropdown.Menu>
    </Dropdown>
  );
}

