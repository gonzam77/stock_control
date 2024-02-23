import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownAccount({ onSelect }) {
  const accounts = useSelector((state) => state.accounts);
  const [select, setSelect] = useState();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(!accounts.length) dispatch(actions.getAllAccounts());
  },[accounts, dispatch])

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select : "Cuenta"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {accounts?.map((account, index) => {
          return (
            <Dropdown.Item key={index} eventKey={account.DESCRIPCION}>
              {" "}
              {account.DESCRIPCION}{" "}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
