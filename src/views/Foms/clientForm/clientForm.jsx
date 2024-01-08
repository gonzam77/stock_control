import { useState } from "react";
import styles from './clientForm.module.css';
import { useSelector, useDispatch } from "react-redux";
import * as actions from '../../../redux/actions'


export default function ClientForm() {
    

    
    const clients = useSelector(state => state.clients);
    const clientId = useSelector(state => state.clientId);
    const dispatch = useDispatch();
    
    const [client, setClient] = useState({clients});
    
    function handleSubmit(event) {
       event.preventDefault();
       dispatch(actions.editProduct(client))
    };
    
    
    function handleChange(event) {
        
        const target = event.target.name;
        const value = event.target.value;
       
        
        const editedClient = clients.map((element) => {
            
            if(element.id === clientId) {
                element[target] = value  
            }
            return element
        })
               
        setClient({editedClient})
    };
        
        return (
            <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                
                <label>Nombre</label><br></br>
                <input autoComplete="off" name="name" value={client.first_name} onChange={handleChange} placeholder="nombre..." type="text" />
                <br></br>
                
                <label>Apellido</label><br></br>
                <input autoComplete="off" name="lastName" value={client.lastName} onChange={handleChange} placeholder="apellido..." type="text" />
                <br></br>

                <label>Genero</label><br></br>
                <input autoComplete="off" name="marca" value={client.genero} onChange={handleChange} placeholder="genero..." type="text" />
                <br></br>

                <label>Direccion</label><br></br>
                <input autoComplete="off" name="adress" value={client.adress} onChange={handleChange} placeholder="direccion..." type="text" />
                <br></br>

                <label>Telefono</label><br></br>
                <input autoComplete="off" name="phone" value={client.adress} placeholder="phone..." onChange={handleChange} type="text" />
                <br></br>
                <br></br>
                <label>Provincia</label><br></br>
                <input autoComplete="off" name="province" value={client.province} placeholder="province..." onChange={handleChange} type="text" />
                <br></br>
                <br></br>
                <label>Localidad</label><br></br>
                <input autoComplete="off" name="state" value={client.adress} placeholder='state...' onChange={handleChange} type="text" />
                <br></br>
                <br></br>
                <label>Fecha de Nacimiento</label><br></br>
                <input autoComplete="off" name="fecha_nac" value={client.adress} placeholder="fecha_nac..." onChange={handleChange} type="date" />
                <br></br>
                <br></br>

                <button className={styles.createButton} type="submit">Editar</button>
            </form>
        </div>
    )
}