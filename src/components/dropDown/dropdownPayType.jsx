import Dropdown from "react-bootstrap/Dropdown";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../../redux/actions';

export default function DropdownPayType({ onSelect }) {
  const [select, setSelect] = useState(null);
  const payTypes = useSelector(state => state.payTypes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!payTypes.length) dispatch(actions.getAllPayTypes());
  }, [payTypes, dispatch]);

  function handleSelect(eventKey) {
    const selectedPayType = payTypes.find(pt => pt.ID_FORMA_PAGO.toString() === eventKey);
    setSelect(selectedPayType);
    onSelect(eventKey); // Devuelve solo el ID_FORMA_PAGO
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {select ? select.NOMBRE : "Metodo de Pago"}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {payTypes?.map((element, index) => (
          <Dropdown.Item key={index} eventKey={element.ID_FORMA_PAGO}>
            {element.NOMBRE}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
