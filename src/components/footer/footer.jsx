import styles from './footer.module.css'
import img from '../../assets/descarga.png'
export default function Footer(){
    return (
        <div className={styles.container}>
            <img src={img} alt='copyRight' width={'10px'}/>
            <span>Created by Gonzalo Medina & Co.</span>
        </div>
    )
}