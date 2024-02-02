import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownUser({ onSelect }) {
  
  const [select, setSelect] = useState();
  const users = useSelector(state => state.users);
  const dispatch = useDispatch();
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  useEffect(()=>{
    if(!users.length) dispatch(actions.getAllUsers());
  },[users])

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Usuario"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {users?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.cuil}>
              {element.first_name}{', '}{element.last_name}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

