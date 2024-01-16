import styles from './dashboard.module.css';
import Aside from '../../components/aside/aside'
import { Button } from 'react-bootstrap';

export default function Dashboard (){
    return (
        <div className=''>
            
            <div className={styles.body}>
                <div className={styles.button}>
                    <Button variant='success'>Nueva Venta</Button>
                </div>
            </div>
        </div>
    )
}