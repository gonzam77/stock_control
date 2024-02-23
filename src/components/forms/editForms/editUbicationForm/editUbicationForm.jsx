import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import * as actions from "../../../../redux/actions";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import styles from "../editForms.module.css";
import axios from "axios";
import { axiosConfig, backURL } from "../../../../App";

export default function EditUbicationForm() {
    const ubications = useSelector((state) => state.ubications);
    const ubicationId = useSelector((state) => state.ubicationId);
    const dispatch = useDispatch();
    const selectedUbication = ubications.find((element) => element.ID_UBICACION === ubicationId);

    const [ubication, setUbication] = useState(selectedUbication);

    useEffect(() => {
        if (!ubications.length) dispatch(actions.getAllUbications());
    }, [ubications, dispatch]);

    async function putUbication(ubicacion) {
        try {
            await axios.put(`${backURL}/ubicacion/update`, ubicacion, axiosConfig)
        } catch (error) {
            console.log(error);
        }
    };

    const cancelModal = () => {
        dispatch(actions.hideModalEditUbication());
    };

    const closeModal = async (event) => {
        event.preventDefault();
        await putUbication({ Ubicacion: ubication });
        dispatch(actions.cleanUbication());
        dispatch(actions.hideModalEditUbication());
    };

    function handleChange(event) {
        const target = event.target.name;
        const value = event.target.value;
        setUbication({
            ...ubication,
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
                        value={ubication.PROVINCIA}
                        onChange={handleChange}
                        placeholder={selectedUbication.PROVINCIA}
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Localidad</label>
                    <input
                        autoComplete="off"
                        name="LOCALIDAD"
                        value={ubication.LOCALIDAD}
                        onChange={handleChange}
                        placeholder={selectedUbication.LOCALIDAD}
                        type="text"
                    />
                </div>
                <div className={styles.divs}>
                    <label>Direccion</label>
                    <input
                        autoComplete="off"
                        name="DIRECCION"
                        value={ubication.DIRECCION}
                        onChange={handleChange}
                        placeholder={selectedUbication.DIRECCION}
                        type="text"
                    />
                </div>
                <div className="modal-footer">
                    <Button variant="danger" onClick={cancelModal}>
                        Cancelar
                    </Button>
                    <Button variant="success" onClick={closeModal}>
                        Confirmar
                    </Button>
                </div>
            </form>
        </div>
    );
}
