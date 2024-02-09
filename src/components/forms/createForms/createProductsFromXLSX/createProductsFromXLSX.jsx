import styles from "../createForms.module.css";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useState } from "react";
import * as actions from "../../../../redux/actions";
import * as XLSX from 'xlsx';

export default function CreateProductsFromXLSX() {
    const dispatch = useDispatch();
    const [state, setState] = useState();

    const closeCreateModal = async (event) => {
        event.preventDefault();
        dispatch(actions.hideImportModal());
    };

    const cancelCreateModal = () => {
        dispatch(actions.hideImportModal());
    };

    function handleChange(event) {
        console.log(event);
        const target = event.target;
        const value = event.value;
        const name = target.name
        setState({
            ...state,
            [name]: value
        });
        let hojas = [];
        if (name === 'file') {
            let reader = new FileReader();
            reader.readAsArrayBuffer(target.files[0]);
            reader.onloadend = (e) => {
                var data = new Uint8Array(e.target.result);
                var workbook = XLSX.read(data, { type: 'array' })

                workbook.SheetNames.forEach(function (sheetName) {
                    var XL_row_object = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    hojas.push({
                        data: XL_row_object,
                        sheetName
                    })
                })
                console.log('hojas',hojas);
                setState({
                    selectedFileDocument: target.files[0],
                    hojas
                })
                console.log('state',state);
            }
        };
    };

    return (
        <div className={styles.container}>
            <form className={styles.form}>
                <div className={styles.divs}>
                    <label>Importar Excel</label>
                    <input
                        id='file'
                        required
                        name="file"
                        onChange={handleChange}
                        placeholder="Archivo Excel"
                        type="file"
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
