import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from '../../../../redux/actions'

export default function CreateUserRolForm() {

    const dispatch = useDispatch();
    const [newRol, setNewRol] = useState({
        id: '',
        code:'',
        name: '',
        description: ''
    });

    const closeCreateModal = (event) => {
        event.preventDefault();
        dispatch(actions.hideCreateModal());
    };

    const cancelCreateModal = () => {
        dispatch(actions.hideCreateModal());
    }

    function handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        setNewRol({
            ...newRol,
            [target]: value,
        });
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.divs}>
                    <label>Nombre</label>
                    <input
                        autoComplete="off"
                        name="name"
                        value={newRol.name}
                        onChange={handleChange}
                        placeholder="Nombre..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Descripcion</label>
                    <input
                        autoComplete="off"
                        name="description"
                        value={newRol.description}
                        onChange={handleChange}
                        placeholder="Descripcion..."
                        type="text"
                    />
                </div>
                
                <div className="modal-footer">
                    <Button variant="danger" onClick={cancelCreateModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={closeCreateModal}>
                        Confirmar
                    </Button>
                </div>
            </form>

        </div>
    )
}