import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownMesures({ onSelect }) {
  
  const [select, setSelect] = useState();
  const mesures = useSelector(state => state.mesures);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Unidad de Medida"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {mesures?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.NOMBRE}>
              {element.NOMBRE}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

