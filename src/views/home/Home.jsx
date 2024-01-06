import styles from './home.module.css'
import Card from '../../components/card/card'
//import { useState } from 'react';


import { productos } from '../../assets/hardcodeo'
import 'bootstrap/dist/css/bootstrap.min.css';
//import Paginate from "../../components/pagination/pagination";


export default function Home() {

    return (
        <div className={styles.container}>  
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
                
        

