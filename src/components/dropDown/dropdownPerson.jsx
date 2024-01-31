import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownPersona({ onSelect }) {
  const [select, setSelect] = useState();
  const personas = useSelector((state) => state.personas);

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Persona"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {personas?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.DNI}>
              {element.NOMBRE} {element.APELLIDO}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
