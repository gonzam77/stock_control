import styles from './suppliers.module.css';
import Table from 'react-bootstrap/Table';
import ModalSuppliersForm from '../../views/modals/modalSupplierForm/modalSupllierForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Button } from "react-bootstrap";


export default function Suppliers () {
    
    const showModalState = useSelector(state => state.showModal);
    const suppliers = useSelector(state => state.suppliers)
    const dispatch = useDispatch();

    const openModal = (id) => {
        dispatch(actions.showModal());
        dispatch(actions.getSupplierId(id));

    };

    const closeModal = () => {    
        dispatch(actions.hideModal());
    };

    return (
        <div className={styles.container}>

            <div className={styles.title}>
                <h1>Proveedores</h1>
            </div>

            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Provincia</th>
                        <th>Localidad</th>
                        <th>Fecha Nacimiento</th>
                        <th>Fecha Creacion</th>
                        <th>Fecha Actualizacion</th>
                        <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        suppliers.map((supplier,index) => {
                            return(
                                <tr key={index}>
                                <td>{supplier.id}</td>
                                <td>{supplier.first_name} {supplier.lastName}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.adress}</td>
                                <td>{supplier.province}</td>
                                <td>{supplier.state}</td>
                                <td>{supplier.fecha_nac}</td>
                                <td>{supplier.fecha_creacion}</td>
                                <td>{supplier.fecha_actualizacion}</td>
                                <td>
                                    <Button variant='info' onClick={() => openModal(supplier.id)} >Modificar</Button>
                                </td>
                                </tr>                        
                            )
                        })
                    }
                    </tbody>
                </Table>
            </div>    
            {showModalState && <ModalSuppliersForm closeModal={closeModal} />}
        </div>
  );
}
