import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownClient({ onSelect }) {
  
  const [select, setSelect] = useState();
  const clients = useSelector(state => state.clients);
  const personas = useSelector(state => state.personas);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Cliente"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {clients.map((element, index) => {
          const persona = personas.find(e=>e.ID_PERSONA === element.ID_PERSONA)
          return (
            <Dropdown.Item key={index} eventKey={element.CUIL}>
              {persona.NOMBRE}{', '}{persona.APELLIDO}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

