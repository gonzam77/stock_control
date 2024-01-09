import styles from './productDetail.module.css'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function ProductDetail(){
    return (
        <div className={styles.container}>
            <Link to='/' className={styles.link}>
                <Button variant='info'>Volver</Button>
            </Link>
        </div>
    )
}