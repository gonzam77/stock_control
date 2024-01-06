import styles from './grid.module.css';
import Table from 'react-bootstrap/Table';
import { productos } from '../../assets/hardcodeo';
import ModalProductForm from '../../components/modalProductForm/modalProductForm';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../redux/actions';

export default function Grid () {
    const [showModal, setShowModal] = useState(false); // Estado para controlar la visibilidad del modal
    const productModal = useSelector(state => state.productModal);
    const dispatch = useDispatch();



    const openModal = () => {
        //setShowModal(true);
        dispatch(actions.changeProductModal())
    };

    const closeModal = () => {
        setShowModal(false);
    };


    return (
        <div className={styles.container}>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th></th>
                    <th>PRODUCTO</th>
                    <th>MARCA</th>
                    <th>STOCK</th>
                    <th>PRECIO</th>
                    <th>DETALLE</th>
                    </tr>
                </thead>
                <tbody>
                {
                    productos.map((producto,index) => {
                        return(
                            <tr>
                            <td>{producto.id}</td>
                            <td>{producto.name}</td>
                            <td>{producto.marca}</td>
                            <td>{producto.stock}</td>
                            <td>{producto.price}</td>
                            <td>
                                <button onClick={openModal}>Editar</button>
                            </td>
                            </tr>                        
                        )
                    })
                }
                </tbody>
            </Table>
            {productModal && <ModalProductForm closeModal={closeModal} />}
        </div>
  );
}
