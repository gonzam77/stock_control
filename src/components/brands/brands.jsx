import { useSelector, useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import { Button } from "react-bootstrap";
import ModalCreateBrandForm from '../../views/modals/createModals/modalCreateBrandForm/modalCreateBrandForm';
import ModalEditBrandForm from '../../views/modals/editModals/modalEditBrandForm/modalEditBrandForm';
import styles from './brands.module.css';
import * as actions from '../../redux/actions';
import { useEffect } from "react";


export default function Brands() {

    const showCreateModal = useSelector((state) => state.showCreateModal);
    const showModalEditBrand = useSelector((state) => state.showModalEditBrand);
    console.log(showModalEditBrand);
    const brands = useSelector((state) => state.brands);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!brands.length) dispatch(actions.getAllBrands());
    }, [brands, dispatch])

    const openModal = (id) => {
        dispatch(actions.showModalEditBrand())
        dispatch(actions.getBrandId(id))
    };

    const openCreateModal = () => {
        dispatch(actions.showCreateModal())
    }

    return (
        <div className={styles.container}>
            <div className={styles.titleContainer}>
                <Button
                    className={styles.createButton}
                    variant="success"
                    onClick={openCreateModal}
                >
                    Cargar Nueva Marca
                </Button>
            </div>

            <div className={styles.title}>
                <h1>Marca</h1>
            </div>
            <div className={styles.tableContainer}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Modificar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands?.map((brand, index) => {
                            return (
                                <tr key={index}>
                                    <td>{brand.NOMBRE}</td>
                                    <td style={{ textAlign: 'center' }}>
                                        <Button variant="primary" onClick={() => openModal(brand.ID_MARCA)}>
                                            Modificar
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
            {showModalEditBrand && <ModalEditBrandForm />}
            {showCreateModal && <ModalCreateBrandForm />}
        </div>
    );
}
