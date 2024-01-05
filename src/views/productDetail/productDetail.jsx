import styles from './productDetail.module.css'
import { Link } from 'react-router-dom'

export default function ProductDetail(){
    return (
        <div className={styles.container}>
            <Link to='/' className={styles.link}>
                <button className={styles.button}>Volver</button>
            </Link>
        </div>
    )
}