import styles from './grid.module.css';
import Table from 'react-bootstrap/Table';
import { productos } from '../../assets/hardcodeo';
import ModalProductForm from '../../components/modalProductForm/modalProductForm';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';


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
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>id</th>
                    <th>PRODUCTO</th>
                    <th>MARCA</th>
                    <th>STOCK</th>
                    <th>PRECIO</th>
                    <th>DETALLE</th>
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
