import styles from "./offers.module.css";
import { useSelector, useDispatch } from "react-redux";
import * as actions from "../../redux/actions";
import { Table } from "react-bootstrap";
import ModalEditOfferForm from "../modals/editModals/modalEditOfferForm/modalEditOfferForm";
import ModaleCreateOfferForm from "../modals/createModals/modalCreateOfferForm/modalCreateOfferForm";
import { Button } from "react-bootstrap";
import { formatDate } from "../../components/date/date";
import { useEffect } from "react";

export default function Offers() {
  const dispatch = useDispatch();
  const date = new Date();
  const showModalState = useSelector((state) => state.showModal);
  const showCreateModal = useSelector((state) => state.showCreateModal);
  const unorderOffers = useSelector((state) => state.offers);
  const offers = unorderOffers.sort((a,b)=> {
    const fechaA = new Date (a.FECHA_INICIO)
    const fechaB = new Date (b.FECHA_INICIO)
    return fechaA - fechaB
  })

  useEffect(()=>{
    if(!offers.length) dispatch(actions.getAllOffers())
  },[offers, dispatch])

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
              <Table striped bordered hover className="rounded-3 overflow-hidden">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Nombre</th>
              <th>Precio Regular</th>
              <th>Descuento</th>
              <th>Forma de Pago</th>
              <th>Precio Final</th>
              <th>Fecha</th>
              <th>Fecha Desde</th>
              <th>Fecha Hasta</th>
              <th>Estado</th>
              <th>Modificar</th>
            </tr>
          </thead>
          <tbody>
            {offers?.map((offer, index) => {
              const porcentaje = parseFloat(offer.PORCENTAJE_DESCUENTO);
              const precio = parseFloat(offer.PRODUCTO.PRECIO_VENTA);
              const fechaDesde = new Date(offer.FECHA_INICIO)
              const fechaHasta = new Date(offer.FECHA_FIN)
              return (
                <tr
                  key={index}
                  style={{ textAlign: "center", verticalAlign: "middle" }}
                >
                  <td>{offer.PRODUCTO.CODIGO}</td>
                  <td>{offer.PRODUCTO.NOMBRE}</td>
                  <td>
                    {"$ "}
                    {offer.PRODUCTO.PRECIO_VENTA}
                  </td>
                  <td>
                    {offer.PORCENTAJE_DESCUENTO}
                    {"%"}
                  </td>
                  <td>
                    {offer.FORMA_PAGO?.NOMBRE}
                  </td>
                  <td>
                    {"$ "}
                    {Number(
                      (1 - porcentaje / 100) * precio
                    ).toFixed(2)}
                  </td>
                  <td>{formatDate(offer.FECHA_CREACION)}</td>
                  <td
                    className={
                      fechaDesde <= date
                        ? styles.activo
                        : styles.inactivo
                    }
                  >
                    {formatDate(fechaDesde)}
                  </td>
                  <td
                    className={
                     fechaHasta >= date
                        ? styles.activo
                        : styles.inactivo
                    }
                  >
                    {formatDate(fechaHasta)}
                  </td>

                  {fechaDesde <= date && fechaHasta >= date ? (
                    <td className={styles.activo}>Activo</td>
                  ) : (
                    <td className={styles.inactivo}>Inactivo</td>
                  )}
                  <td style={{ textAlign: "center" }}>
                    <Button
                      variant="primary"
                      onClick={() => openModal(offer.ID_DESCUENTO)}
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
