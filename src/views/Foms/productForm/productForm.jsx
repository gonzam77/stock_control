import { useState } from "react";
import styles from './productForm.module.css';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'


export default function ProductForm() {
    

    
    const products = useSelector(state => state.products);
    const productId = useSelector(state => state.productId);
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState({products});
    
    function handleSubmit(event) {
        event.preventDefault();
       dispatch(actions.editProduct(product))
    };
    
    
    function handleChange(event) {
        
        const target = event.target.name;
        //console.log('target: ',target);
        const value = event.target.value;
        //console.log('value: ',value);
        
        const editedProduct = products.map((element) => {
            
            if(element.id === productId) {
                element[target] = value  
            }
            return element
        })
               
        setProduct({editedProduct})
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