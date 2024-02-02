import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./card.module.css";
import ModalEditProductForm from "../../../views/modals/editModals/modalEditProductForm/modalEditProductForm";
import * as actions from "../../../redux/actions";

function ProductCard({ id, name, brand, price, stock, supplier }) {
  const showModalState = useSelector((state) => state.showModal);
  const suppliers = useSelector((state) => state.suppliers);
  const proveedor = suppliers.find(element => element.ID_PROVEEDOR === supplier)
  const marcas = useSelector((state) => state.brands);
  console.log(marcas);
  console.log('brand', brand);
  const marca = marcas.find(element => element.ID_MARCA === brand)
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getProductId(id));
  };

  useEffect(()=>{
    if(!suppliers.length) dispatch(actions.getAllSuppliers())
  },[suppliers])

  const closeModal = () => {
    dispatch(actions.hideModal());
  };

  return (
    <div className={styles.container}>
      <Card className={styles.card} style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title className={styles.name}>
            {name} {marca?.NOMBRE}
          </Card.Title>
          <Card.Text>Sock: {stock}</Card.Text>
          <Card.Text>Precio: ${price}</Card.Text>
          <Card.Text>Proveedor: {proveedor?.RAZON_SOCIAL}</Card.Text>
          <div className={styles.buttons}>
            <Link to={`/productDetail/${id}`} className={styles.detailButton}>
              <Button variant="primary">Detalle</Button>
            </Link>
            <Button variant="primary" onClick={() => openModal(id)}>
              Modificar
            </Button>
          </div>
        </Card.Body>
      </Card>
      {showModalState && <ModalEditProductForm closeModal={closeModal} />}
    </div>
  );
}

export default ProductCard;
