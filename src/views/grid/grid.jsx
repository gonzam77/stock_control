import styles from './grid.module.css';
import Table from 'react-bootstrap/Table';
import { productos } from '../../assets/hardcodeo';

export default function Grid () {
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
                        <td>@mdo</td>
                        </tr>                        
                    )
                })
            }
            </tbody>
        </Table>
    </div>
  );
}
