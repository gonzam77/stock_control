import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownDeposit({ onSelect }) {
  
  const [select, setSelect] = useState(null);
  const deposits = useSelector(state => state.deposits);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!deposits.length) dispatch(actions.getAllDeposits());
  },[deposits,dispatch])
  
  function handleSelect(eventKey) {

    const selectedDeposit = deposits.find(e=> e.ID_BODEGA.toString() === eventKey);
    setSelect(selectedDeposit);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select.NOMBRE : "Deposito"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {deposits?.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.ID_BODEGA}>
              {element.NOMBRE}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

