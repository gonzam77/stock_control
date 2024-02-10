import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownCategory({ onSelect }) {
  
  const [select, setSelect] = useState();
  const categories = useSelector(state => state.categories);
  const dispatch = useDispatch();
  
    useEffect(()=>{
        if(!categories.length) dispatch(actions.getAllCategories())
    },[categories, dispatch]);


  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Categoria"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {categories?.map((element, index) => {
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

