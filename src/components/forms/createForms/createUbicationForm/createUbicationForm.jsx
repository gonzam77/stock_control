import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

export default function CreateUbicationForm() {
    const dispatch = useDispatch();
    const [newUbication, setNewUbication] = useState({
        PAIS:'Argentina',
        PROVINCIA: "",
        LOCALIDAD: "",
        DIRECCION: ''
    });

    async function postUbication(ubicacion) {
        try {
            await axios.post(`${backURL}/ubicacion/nuevo`, ubicacion, axiosConfig)
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.response.data.Message,
                icon: 'error',
                confirmButtonText: 'Cerrar',
                confirmButtonColor: '#0a7f02',
                keydownListenerCapture: false
            });
            console.log(error);
        }
    }

    const closeCreateModal = async (event) => {
        event.preventDefault();
        await postUbication({ Ubicacion: newUbication });
        dispatch(actions.cleanUbication());
        dispatch(actions.hideCreateModal());
    };

    const cancelCreateModal = () => {
        dispatch(actions.hideCreateModal());
    };

    function handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        setNewUbication({
            ...newUbication,
            [target]: value,
        });
    }

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.divs}>
                    <label>Provincia</label>
                    <input
                        autoComplete="off"
                        name="PROVINCIA"
                        value={newUbication.PROVINCIA}
                        onChange={handleChange}
                        placeholder="Provincia..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Localidad</label>
                    <input
                        autoComplete="off"
                        name="LOCALIDAD"
                        value={newUbication.LOCALIDAD}
                        onChange={handleChange}
                        placeholder="Localidad..."
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Direccion</label>
                    <input
                        autoComplete="off"
                        name="DIRECCION"
                        value={newUbication.DIRECCION}
                        onChange={handleChange}
                        placeholder="Direccion..."
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
