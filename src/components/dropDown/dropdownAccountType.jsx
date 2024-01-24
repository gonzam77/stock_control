import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownAccountType({ onSelect }) {
  
  const [select, setSelect] = useState();
  const accountTypes = useSelector(state => state.accountTypes);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Tipo de Cuenta"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {accountTypes.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.id}>
              {element.description}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

