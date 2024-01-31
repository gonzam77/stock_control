import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownUser({ onSelect }) {
  
  const [select, setSelect] = useState();
  const users = useSelector(state => state.users);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Usuario"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {users?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.cuil}>
              {element.first_name}{', '}{element.last_name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

