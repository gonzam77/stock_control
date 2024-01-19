import styles from "./inicio.module.css";
import { Button } from "react-bootstrap";
import ModalNewSale from "../modals/newSale/newSale";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";

export default function inicio() {
  const showNewSaleModal = useSelector((state) => state.showNewSaleModal);
  const dispatch = useDispatch();

  const openNewSaleModal = () => {
    dispatch(actions.showNewSaleModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.button}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openNewSaleModal}
        >
          Nueva Venta
        </Button>
      </div>
      {showNewSaleModal && <ModalNewSale />}
    </div>
  );
}
