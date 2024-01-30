import styles from "./offers.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditOfferForm from "../modals/editModals/modalEditOfferForm/modalEditOfferForm";
import ModaleCreateOfferForm from "../modals/createModals/modalCreateOfferForm/modalCreateOfferForm";
import { Button } from "react-bootstrap";
import { formatDate } from "../../components/date/date";

export default function Offers() {
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const offers = useSelector((state) => state.offers);
  const date = new Date();

  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch(actions.showModal());
    dispatch(actions.getOfferId(id));
  };

  const openCreateModal = () => {
    dispatch(actions.showCreateModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Button
          className={styles.createButton}
          variant="success"
          onClick={openCreateModal}
        >
          Cargar Nuevo
        </Button>
      </div>

      <div className={styles.title}>
        <h1>Productos en Oferta</h1>
      </div>
      <div className={styles.tableContainer}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Precio Regular</th>
              <th>Descuento</th>
              <th>Precio Final</th>
              <th>Fecha</th>
              <th>Fecha Desde</th>
              <th>Fecha Hasta</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {offers.map((offer, index) => {
              const productInOffer = products.find(
                (e) => offer.product_id == e.ID_PRODUCTO
              );
              console.log(products);
              console.log(productInOffer);
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{productInOffer?.CODIGO}</td>
                  <td>{productInOffer?.NOMBRE}</td>
                  <td>
                    {"$ "}
                    {productInOffer?.PRECIO_VENTA}
                  </td>
                  <td>
                    {offer.discount}
                    {"%"}
                  </td>
                  <td>
                    {"$ "}
                    {Math.round(
                      (1 - offer.discount / 100) * productInOffer?.PRECIO_VENTA
                    )}
                  </td>
                  <td>{formatDate(offer.create_date)}</td>
                  <td
                    className={
                      offer.from_date <= date
                        ? styles.activo
                        : styles.inactivo
                    }
                  >
                    {formatDate(offer.from_date)}
                  </td>
                  <td
                    className={offer.to_date >= date
                      ? styles.activo
                      : styles.inactivo
                    }
                  >
                    {formatDate(offer.to_date)}
                  </td>

                  {offer.from_date <= date && offer.to_date >= date ?
                    (
                      <td className={styles.activo}>Activo</td>
                    )
                    : (
                      <td className={styles.inactivo}>Inactivo</td>
                    )}
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(offer.id)}
                    >
                      Modificar
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {showModalState && <ModalEditOfferForm />}
      {showCreateModal && <ModaleCreateOfferForm />}
    </div>
  );
}
