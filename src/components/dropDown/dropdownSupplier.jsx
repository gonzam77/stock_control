import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions'


function DropdownSupplier({ onSelect }) {
  
  const [select, setSelect] = useState();
  const suppliers = useSelector(state => state.suppliers);
  const dispatch = useDispatch();
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!suppliers.length) dispatch(actions.getAllSuppliers())
  },[suppliers])

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
