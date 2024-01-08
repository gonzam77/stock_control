import styles from './products.module.css';
import Table from 'react-bootstrap/Table';
import ModalProductForm from '../../components/modals/modalProductForm/modalProductForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function Grid () {
    
    const showModalState = useSelector(state => state.showModal);
    const products = useSelector(state => state.products)
    const dispatch = useDispatch();

    const openModal = (id) => {
        dispatch(actions.showModal());
        dispatch(actions.getProductId(id));

    };

    const closeModal = () => {    
        dispatch(actions.hideModal());
    };

    return (
        <div className={styles.container}>

            <div className={styles.titleContainer}>
                <Link to="/products" className={styles.link}>
                    <Button variant="info">Cargar nuevo</Button>
                </Link>
                <Link to="/" className={styles.link}>
                    <Button variant="info">Carta</Button>
                </Link>
            </div>


            <h1 className={styles.title}>Productos</h1>

            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>PRODUCTO</th>
                    <th>MARCA</th>
                    <th>STOCK</th>
                    <th>PRECIO</th>
                    <th>MODIFICAR</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map((producto,index) => {
                        return(
                            <tr key={index}>
                            <td>{producto.id}</td>
                            <td>{producto.name}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.price}</td>
                            <td>
                                <button onClick={() => openModal(producto.id)} >Modificar</button>
                            </td>
                            </tr>                        
                        )
                    })
                }
                </tbody>
            </Table>
            {showModalState && <ModalProductForm closeModal={closeModal} />}
        </div>
  );
}
