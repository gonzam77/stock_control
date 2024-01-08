import styles from './suppliers.module.css';
import Table from 'react-bootstrap/Table';
import ModalSuppliersForm from '../../components/modals/modalSupplierForm/modalSupllierForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';


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

            <h1 className={styles.title}>Proveedores</h1>

            <Table striped bordered hover>
            <thead>
                    <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Genero</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
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
                            <td>{supplier.genero}</td>
                            <td>{supplier.adress}</td>
                            <td>{supplier.phone}</td>
                            <td>{supplier.province}</td>
                            <td>{supplier.state}</td>
                            <td>{supplier.fecha_nac}</td>
                            <td>{supplier.fecha_creacion}</td>
                            <td>{supplier.fecha_actualizacion}</td>
                            <td>
                                <button onClick={() => openModal(supplier.id)} >Modificar</button>
                            </td>
                            </tr>                        
                        )
                    })
                }
                </tbody>
            </Table>
            {showModalState && <ModalSuppliersForm closeModal={closeModal} />}
        </div>
  );
}
