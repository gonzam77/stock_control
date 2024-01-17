import styles from './inicio.module.css';
import { Button } from 'react-bootstrap';

export default function inicio() {
    return (
        <div className={styles.container}>
            <div className={styles.button}>
                <Button variant='success'>Nueva Venta</Button>
            </div>
        </div>
    )
}