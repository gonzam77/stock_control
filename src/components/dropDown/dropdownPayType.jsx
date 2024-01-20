import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownPayType({ onSelect }) {
  
  const [select, setSelect] = useState();
  const payTypes = useSelector(state => state.payTypes);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Metodo de Pago"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {payTypes.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.name}>
              {element.name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

