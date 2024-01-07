import styles from './home.module.css'
import Card from '../../components/card/card'
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {

    const products = useSelector(state => state.products)

    return (
        <div className={styles.container}>  
            <div className={styles.cards}>
                {
                    products.length ? (
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
                    ) :
                        <div className={styles.loading}>
                            <h1 className={styles.loading}>LOADING...</h1>
                        </div>
                }
            </div>
        </div>
    )
}
                
        

