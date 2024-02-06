import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

function DropdownUbication({ onSelect }) {
  
  const [select, setSelect] = useState();
  const ubicaciones = useSelector(state => state.ubicaciones);
  const dispatch = useDispatch();
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!ubicaciones.length)dispatch(actions.getAllUbications())
  },[ubicaciones, dispatch])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Ubicacion"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'Desconocido'}>Desconocido</Dropdown.Item>
        {ubicaciones?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.DIRECCION}>
              {element.DIRECCION}{' '}{element.LOCALIDAD}{', '}{element.PROVINCIA}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownUbication;
