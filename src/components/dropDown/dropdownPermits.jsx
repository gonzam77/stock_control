import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export default function DropdownPermits({ onSelect }) {
  
  const [select, setSelect] = useState();
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "No"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
            <Dropdown.Item eventKey={'Si'}>
              {'Si'}
            </Dropdown.Item>
            <Dropdown.Item eventKey={'No'}>
              {'No'}
            </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

