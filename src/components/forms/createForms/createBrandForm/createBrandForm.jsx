import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from "../../../../redux/actions";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";
import Swal from 'sweetalert2';

export default function CreateBrandForm() {
    const dispatch = useDispatch();
    const [newBrand, setNewBrand] = useState({
        NOMBRE: "",
        ESTADO: 1
    });

    async function PostBrand(marca) {
        try {
            await axios.post(`${backURL}/marca/nuevo`, marca, axiosConfig)
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
    };

    const closeCreateModal = async (event) => {
        event.preventDefault();
        await PostBrand({ Marca: newBrand })
        dispatch(actions.cleanBrands());
        dispatch(actions.hideCreateModal());
    };

    const cancelCreateModal = () => {
        dispatch(actions.hideCreateModal());
    };

    function handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        setNewBrand({
            ...newBrand,
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
                        value={newBrand.NOMBRE}
                        onChange={handleChange}
                        placeholder="Nombre..."
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
