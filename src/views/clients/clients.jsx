import styles from './clients.module.css';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Table } from 'react-bootstrap';
import ModalClientForm from '../modals/modalClientForm/modalClientForm';

export default function Clients(){

    const showModalState = useSelector(state => state.showModal);
    const clients = useSelector(state => state.clients)
    const dispatch = useDispatch();

    const openModal = (id) => {
        dispatch(actions.showModal());
        dispatch(actions.getClientId(id));

    };

    const closeModal = () => {    
        dispatch(actions.hideModal());
    };

    return (
        <div className={styles.container}>
            
            <h1 className={styles.title}>Clientes</h1>
            
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
                    clients.map((client,index) => {
                        return(
                            <tr key={index}>
                            <td>{client.id}</td>
                            <td>{client.first_name} {client.lastName}</td>
                            <td>{client.genero}</td>
                            <td>{client.adress}</td>
                            <td>{client.phone}</td>
                            <td>{client.province}</td>
                            <td>{client.state}</td>
                            <td>{client.fecha_nac}</td>
                            <td>{client.fecha_creacion}</td>
                            <td>{client.fecha_actualizacion}</td>
                            <td>
                                <button onClick={() => openModal(client.id)} >Modificar</button>
                            </td>
                            </tr>                        
                        )
                    })
                }
                </tbody>
            </Table>
            {showModalState && <ModalClientForm closeModal={closeModal} />}
        </div>
  );
}