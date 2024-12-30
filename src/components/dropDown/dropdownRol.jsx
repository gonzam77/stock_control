import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

function DropdownRoles({ onSelect }) {
  
  const [select, setSelect] = useState();
  const roles = useSelector(state => state.userTypes);
  const dispatch = useDispatch();
  
  function handleSelect(eventKey) {
    const selectedRol = roles.find(e => e.ID_TIPO_USUARIO.toString() === eventKey);
    setSelect(selectedRol);
    onSelect(eventKey);
  };

  useEffect(()=>{
    if(!roles || roles?.length === 0) dispatch(actions.getAllUserTypes());
  },[roles, dispatch]);

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select.DESCRIPCION : "Tipo de Usuario"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item eventKey={'No asignado'}>No asignado</Dropdown.Item>
        {roles?.map((element, index) => {
          const selectedRol = roles.find(e => e.ID_TIPO_USUARIO === element.ID_TIPO_USUARIO);
          return (
            <Dropdown.Item key={index} eventKey={element.ID_TIPO_USUARIO}>
              {selectedRol.DESCRIPCION}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownRoles;
