import styles from './home.module.css'
import Card from '../../components/card/card'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';


export default function Home() {

    const products = useSelector(state => state.products)

    return (
        <div className={styles.container}>  
            <div className={styles.titleContainer}>
                <Link to="/createProduct" className={styles.link}>
                    <Button variant="info">Cargar nuevo</Button>
                </Link>
                <Link to="/products" className={styles.link}>
                    <Button variant="info">Tabla</Button>
                </Link>
            </div>
            <div>
                <h1 className={styles.title}>Productos</h1>
            </div>            
            <div className={styles.cards}>
                {
                    products.map((product, index) => {
                        return (
                            <Card
                                key={index}
                                id={product.id}
                                name={product.name}
                                image={product.image}
                                price={product.price}
                                stock={product.stock}
                                marca={product.marca}
                                description={product.description}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}
                
        

