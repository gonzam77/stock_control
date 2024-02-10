import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownBrands({ onSelect }) {
  
  const [select, setSelect] = useState();
  const brands = useSelector(state => state.brands);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!brands.length) dispatch(actions.getAllBrands());
  },[brands, dispatch])
  
  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Marca"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {brands?.map((element, index) => {
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

