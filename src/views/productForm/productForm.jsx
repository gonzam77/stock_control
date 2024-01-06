import { useState } from "react";
import styles from './productForm.module.css';
import { productos } from "../../assets/hardcodeo";


export default function ProductForm() {
    const [product, setProduct] = useState({
        name: "",
        marca: "",
        stock: "",
        price: [],
        description: "",
    });

    function handleSubmit(event) {
        event.preventDefault();
        productos = {
            ...productos,
            product
        }
        setProduct({
            name: "",
            marca: "",
            stock: "",
            price: [],
            description: "",
        })
    };


   
    function handleChange(event) {
            setProduct({
                ...product,
                [event.target.name]: event.target.value
            })
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <label>Nombre</label><br></br>
                <input autoComplete="off" name="name" value={product.name} onChange={handleChange} placeholder="nombre..." type="text" />
                <br></br>

                <label>Marca</label><br></br>
                <input autoComplete="off" name="marca" value={product.marca} onChange={handleChange} placeholder="marca..." type="text" />
                <br></br>

                <label>Stock</label><br></br>
                <input autoComplete="off" name="stock" value={product.stock} onChange={handleChange} placeholder="stock..." type="text" />
                <br></br>

                <label>Precio</label><br></br>
                <input autoComplete="off" name="price" placeholder="precio..." type="text" />
                <br></br>
                <br></br>

                <button className={styles.createButton} type="submit">Editar</button>
            </form>
        </div>
    )
}