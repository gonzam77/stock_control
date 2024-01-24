import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function DropdownAccount({ onSelect }) {
  const accounts = useSelector((state) => state.accounts);
  const [select, setSelect] = useState();

  function handleSelect(eventKey) {
    setSelect(eventKey);
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="primary" id="dropdown-basic">
        {select ? select : "Cuenta"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {accounts.map((account, index) => {
          return (
            <Dropdown.Item key={index} eventKey={account.description}>
              {" "}
              {account.description}{" "}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}
