import styles from "./offers.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditOfferForm from "../modals/editModals/modalEditOfferForm/modalEditOfferForm";
import ModaleCreateOfferForm from "../modals/createModals/modalCreateOfferForm/modalCreateOfferForm";
import { Button } from "react-bootstrap";
import { formatDate } from "../../components/date/date";
import moment from "moment/moment";

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
                (e) => offer.product_id == e.id
              );
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{productInOffer?.code}</td>
                  <td>{productInOffer?.name}</td>
                  <td>
                    {"$ "}
                    {productInOffer?.price}
                  </td>
                  <td>
                    {offer.discount}
                    {"%"}
                  </td>
                  <td>
                    {"$ "}
                    {Math.round(
                      (1 - offer.discount / 100) * productInOffer?.price
                    )}
                  </td>
                  <td>{formatDate(offer.create_date)}</td>
                  <td
                    className={
                      offer.from_date > date || offer.to_date < date
                        ? styles.inactivo
                        : undefined
                    }
                  >
                    {moment(offer.from_date).format("DD-MM-yyyy")}
                  </td>
                  <td
                    className={
                      offer.to_date < date ? styles.inactivo : undefined
                    }
                  >
                    {moment(offer.to_date).format("DD-MM-yyyy")}
                  </td>

                  {offer.from_date <= date &&
                  (new Date(new Date(offer.to_date).getFullYear(), 
                  new Date(offer.to_date).getMonth(), 
                  new Date(offer.to_date).getDate()+2)) >= date ? (
                    <> 
                      {/* <td></td> */}
                      <td className={styles.activo}>Activo</td>
                    </>
                  ) : (
                    <> 
                      {/* <td></td> */}
                      <td className={styles.inactivo}>Inactivo</td>
                    </>
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
