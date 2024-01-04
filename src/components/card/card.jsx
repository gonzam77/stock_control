
import styles from "./card.module.css";
import { Link } from "react-router-dom";

export default function Card({id, name, image, price, stock}) {
    if(name) {
        return (
            <div className={styles.card}>
                <Link to={`/detail/${id}`} className={styles.link} >
                    <h3>{name}</h3>
                    <img className={styles.image} src={image} alt={name} width={'200px'} height={'400px'}/>
                </Link>
            </div>
        )
    }
    return null
}