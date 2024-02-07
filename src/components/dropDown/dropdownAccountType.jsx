import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownAccountType({ onSelect }) {
  
  const [select, setSelect] = useState();
  const accountTypes = useSelector(state => state.accountTypes);
  const dispatch = useDispatch();

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!accountTypes.length) dispatch(actions.getAllAccountTypes())
  },[accountTypes])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Tipo de Cuenta"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {accountTypes?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.DESCRIPCION}>
              {element.DESCRIPCION}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

