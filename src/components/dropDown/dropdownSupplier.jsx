import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";


function DropdownSupplier({ onSelect }) {
  
  const [select, setSelect] = useState();
  const suppliers = useSelector(state => state.suppliers);
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Proveedor"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'Desconocido'}>Desconocido</Dropdown.Item>
        {suppliers?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.RAZON_SOCIAL}>
              {element.RAZON_SOCIAL}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownSupplier;
