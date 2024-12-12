import { useState } from "react";
import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function CreatePersonForm() {
    const dispatch = useDispatch();

    const [newPerson, setNewPerson] = useState({
        NOMBRE: "",
        APELLIDO: "",
        DNI: "",
        EMAIL: "",
        TELEFONO: "",
    });

    async function postPerson(persona) {
        try {
            await axios.post(`${backURL}/persona/nuevo`, persona, axiosConfig)
        } catch (error) {
            console.log(error);
        }
    }

    const closeCreateModal = async (event) => {
        event.preventDefault();
        await postPerson({ Persona: newPerson })
        dispatch(actions.cleanPerson());
        dispatch(actions.hideCreateModal());
    };

    const cancelCreateModal = () => {
        dispatch(actions.hideCreateModal());
    };

    function handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        setNewPerson({
            ...newPerson,
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
                        name="NOMBRE"
                        value={newPerson.NOMBRE}
                        onChange={handleChange}
                        placeholder="Nombre..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Apellido</label>
                    <input
                        autoComplete="off"
                        name="APELLIDO"
                        value={newPerson.APELLIDO}
                        onChange={handleChange}
                        placeholder="APELLIDO..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>DNI</label>
                    <input
                        autoComplete="off"
                        name="DNI"
                        value={newPerson.DNI}
                        onChange={handleChange}
                        placeholder="DNI..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Email</label>
                    <input
                        autoComplete="off"
                        name="EMAIL"
                        value={newPerson.EMAIL}
                        onChange={handleChange}
                        placeholder="EMAIL..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Telefono</label>
                    <input
                        autoComplete="off"
                        name="TELEFONO"
                        value={newPerson.TELEFONO}
                        onChange={handleChange}
                        placeholder="TELEFONO..."
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
    );
}
