import { useState } from "react";
import styles from './createProductForm.module.css';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'
import { Button } from "react-bootstrap";


export default function CreateProductForm() {
    
    const products = useSelector(state => state.products);
    const dispatch = useDispatch();

    
    const [newProduct, setNewProduct] = useState({
        name:'',
        marca:'',
        stock:'',
        price:'',
    });
    
    function handleChange(event) { 
        const target = event.target.name;
        const value = event.target.value;
            
        setNewProduct({
            ...newProduct,
            [target]:value
        })
    };

    function handleSubmit(event) {
        event.preventDefault();
        dispatch(actions.createProduct(products))
    };
    
    
        
        return (
            <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <label>Nombre</label><br></br>
                <input autoComplete="off" name="name" value={newProduct.name} onChange={handleChange} placeholder='Nombre...' type="text" />
                <br></br>

                <label>Marca</label><br></br>
                <input autoComplete="off" name="marca" value={newProduct.marca} onChange={handleChange} placeholder='Marca...' type="text" />
                <br></br>

                <label>Stock</label><br></br>
                <input autoComplete="off" name="stock" value={newProduct.stock} onChange={handleChange} placeholder='Stck...' type="text" />
                <br></br>

                <label>Precio</label><br></br>
                <input autoComplete="off" name="price" value={newProduct.price} onChange={handleChange} placeholder='Precio...' type="text"  />
                <br></br>
                <br></br>

                <Button variant="info" type="submit">Guardar</Button>

            </form>
        </div>
    )
}