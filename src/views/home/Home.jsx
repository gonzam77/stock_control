import styles from './home.module.css'
import Card from '../../components/card/card'

import { productos } from '../../assets/hardcodeo'

export default function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.aside}>
                <div>
                    
                </div>
            </div>
            <div className={styles.cards}>
                {
                    productos.length ? (
                        productos.map((product, index) => {
                            return (
                                <Card
                                    key={index}
                                    id={product.id}
                                    name={product.name}
                                    image={product.image}
                                    price={product.price}
                                    stock={product.stock}
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

