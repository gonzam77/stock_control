import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownPayType({ onSelect }) {
  
  const [select, setSelect] = useState();
  const payTypes = useSelector(state => state.payTypes);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!payTypes.length) dispatch(actions.getAllPayTypes())
  },[payTypes, dispatch])
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Metodo de Pago"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {payTypes?.map((element, index) => {
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

