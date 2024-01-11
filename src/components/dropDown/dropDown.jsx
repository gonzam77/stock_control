import Dropdown from "react-bootstrap/Dropdown";

function DropdownSupplier({ suppliers, onSelect }) {
  
    function handleSelect(eventKey) {
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Proveedor
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {suppliers.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.razon_social}>
              {element.razon_social}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownSupplier;
