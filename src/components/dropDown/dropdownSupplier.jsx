import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions'


function DropdownSupplier({ onSelect }) {
  
  const [select, setSelect] = useState(null);
  const suppliers = useSelector(state => state.suppliers);
  const dispatch = useDispatch();
  
  function handleSelect(eventKey) {
    const selectedSupplier = suppliers.find(e =>e.ID_PROVEEDOR.toString() === eventKey);
    setSelect(selectedSupplier);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!suppliers.length) dispatch(actions.getAllSuppliers())
  },[dispatch, suppliers])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select.RAZON_SOCIAL : "Proveedor"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'Desconocido'}>Desconocido</Dropdown.Item>
        {suppliers?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.ID_PROVEEDOR}>
              {element.RAZON_SOCIAL}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownSupplier;
