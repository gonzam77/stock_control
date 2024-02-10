import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from '../../../../redux/actions'
import axios from "axios";
import DropdownPermits from '../../../dropdown/dropdownPermits';
import { backURL } from "../../../../App";

export default function CreateUserRolForm() {

    const dispatch = useDispatch();
    const [newRol, setNewRol] = useState({
        DESCRIPCION: ''
    });

    async function postUserType(tipo) {
        try {
            axios.post(`${backURL}/tipo/nuevo`, tipo)
        } catch (error) {
            console.log(error);
        }
    };

    const handlePermitsRead = (eventkey) => {
        if (eventkey === 'Si') {
            setNewRol({
                ...newRol,
                READ: 1
            })
        } else {
            setNewRol({
                ...newRol,
                READ: 0
            })
        }
    }
    const handlePermitsCreate = (eventkey) => {
        if (eventkey === 'Si') {
            setNewRol({
                ...newRol,
                CREATE: 1
            })
        } else {
            setNewRol({
                ...newRol,
                CREATE: 0
            })
        }
    }
    const handlePermitsUpdate = (eventkey) => {
        if (eventkey === 'Si') {
            setNewRol({
                ...newRol,
                UPDATE: 1
            })
        } else {
            setNewRol({
                ...newRol,
                UPDATE: 0
            })
        }
    };

    const handlePermitsDelete = (eventkey) => {
        if (eventkey === 'Si') {
            setNewRol({
                ...newRol,
                DELETE: 1
            })
        } else {
            setNewRol({
                ...newRol,
                DELETE: 0
            })
        }
    };

    const closeCreateModal = async (event) => {
        event.preventDefault();
        await postUserType({ TipoUsuario: newRol });
        dispatch(actions.cleanUserTypes());
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
                    <label>Descripcion</label>
                    <input
                        autoComplete="off"
                        name="DESCRIPCION"
                        value={newRol.DESCRIPCION}
                        onChange={handleChange}
                        placeholder="Descripcion..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}></div>
                    <h5>Permisos</h5>
                <div className={styles.divs}>
                    <p>Ver</p>
                    <DropdownPermits onSelect={handlePermitsRead}></DropdownPermits>
                </div>
                <div className={styles.divs}>
                    <p>Crear</p>
                    <DropdownPermits onSelect={handlePermitsCreate}></DropdownPermits>
                </div>
                <div className={styles.divs}>
                    <span>Modificar</span>
                    <DropdownPermits onSelect={handlePermitsUpdate}></DropdownPermits>
                </div>
                <div className={styles.divs}>
                    <span>Eliminar</span>
                    <DropdownPermits onSelect={handlePermitsDelete}></DropdownPermits>
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