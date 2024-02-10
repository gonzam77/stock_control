import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownUbication({ onSelect }) {
  
  const [select, setSelect] = useState();
  const ubications = useSelector(state => state.ubications);
  const dispatch = useDispatch();
  

  useEffect(()=>{
    if(!ubications.length) dispatch(actions.getAllUbications());
  },[ubications, dispatch])

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!ubications.length)dispatch(actions.getAllUbications())
  },[ubications, dispatch])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Ubicacion"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'Desconocido'}>Desconocido</Dropdown.Item>
        {ubications?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.DIRECCION}>
              {element.DIRECCION}{' '}{element.LOCALIDAD}{', '}{element.PROVINCIA}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};
