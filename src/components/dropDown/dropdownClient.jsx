import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownClient({ onSelect }) {
  
  const [select, setSelect] = useState();
  const clients = useSelector(state => state.clients);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    if(!clients.length) dispatch(actions.getAllClients());
  },[clients, dispatch])

  function handleSelect(eventKey) {
    //suppliers.find(e =>e.ID_PROVEEDOR.toString() === eventKey);
    const selectedClient = clients?.find(e=>e.ID_CLIENTE.toString() === eventKey)
    setSelect(selectedClient);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select.RAZON_SOCIAL : "Cliente"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {clients?.map((element, index) => {
          const client = clients?.find(e=>e.ID_CLIENTE === element.ID_CLIENTE)
          return (
            <Dropdown.Item key={index} eventKey={element.ID_CLIENTE}>
              {client?.RAZON_SOCIAL}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

