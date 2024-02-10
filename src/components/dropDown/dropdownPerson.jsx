import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownPersona({ onSelect }) {
  const [select, setSelect] = useState();
  const personas = useSelector((state) => state.persons);
  
  const dispatch = useDispatch();
  
  async function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!personas.length) dispatch(actions.getAllPersons())
  },[dispatch, personas])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Persona"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {personas?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.NOMBRE}>
              {element.NOMBRE} {element.APELLIDO}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
