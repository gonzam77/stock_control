import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownDeposit({ onSelect }) {
  
  const [select, setSelect] = useState();
  const deposits = useSelector(state => state.deposits);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!deposits.length) dispatch(actions.getAllDeposits());
  },[deposits,dispatch])
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Deposito"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {deposits?.map((element, index) => {
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

