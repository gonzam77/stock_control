import { Button } from "react-bootstrap";
import styles from './create.module.css';
import * as actions from '../../../redux/actions';
import { useDispatch } from "react-redux";

export default function Create() {

    const dispatch = useDispatch();

    const openCreateModal = () => {
        dispatch(actions.showCreateModal());
    };

    return (
        <div>
            <Button className={styles.createButton} variant="info" onClick={openCreateModal}> Cargar Nuevo </Button>
        </div>
    )
}