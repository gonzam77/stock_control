<<<<<<< HEAD
import Dropdown from "react-bootstrap/Dropdown";

function DropdownSupplier({ suppliers, onSelect }) {
  
    function handleSelect(eventKey) {
    onSelect(eventKey);
  }

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        Proveedor
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {suppliers.map((element, index) => {
          return (
            <Dropdown.Item key={index} eventKey={element.razon_social}>
              {element.razon_social}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default DropdownSupplier;
=======
import Dropdown from 'react-bootstrap/Dropdown';
import styles from './dropDown.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import * as actions from '../../redux/actions';

function DropdownComponent() {
    const dispatch = useDispatch();
    const suppliers = useSelector(state => state.suppliers);
    const [selectedSupplier, setSelectedSupplier] = useState(null);

    const handleSelect = (event) => {
        const cuil = event.value.toString()
        const selected = suppliers.find(supplier => supplier.cuil === cuil);
        setSelectedSupplier(selected);
        dispatch(actions.setSelectedSupplier(selected)); 
    };

    return (
        <div className={styles.container}>
            <span className={styles.title}>Proveedor</span>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                    {selectedSupplier ? selectedSupplier.cuil : 'Seleccionar Proveedor'}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {
                        suppliers.map((element, index) => (
                            <Dropdown.Item key={index} eventKey={element.cuil}>
                                {element.cuil}
                            </Dropdown.Item>
                        ))
                    }
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default DropdownComponent;
>>>>>>> 4b99b2adae04b8abdfc595e83368284c812e6c02
