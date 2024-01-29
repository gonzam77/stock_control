import Card from "react-bootstrap/Card";
import styles from './saleDetail.module.css';

export default function CardDetail({
    id,
    items,
    number,
    date,
    payType,
    client,
    deposit,
    quantity,
}) {
    return (
        <div className={styles.container}>
            <Card className="text-center">
                <Card.Header>Venta N°{number}</Card.Header>
                <Card.Body>
                    <Card.Text>Fecha: {date}</Card.Text>
                    <Card.Text>Metodo de Pago: {payType}</Card.Text>
                    <Card.Text>Cliente: {client}</Card.Text>
                    <Card.Text>Local {deposit}</Card.Text>
                    <Card.Text>Cantidad de Items: {quantity}</Card.Text>
                    {
                        items?.map(e=>{
                            return(
                                <>
                                    <Card.Text>Cantidad {e.quantity}</Card.Text>
                                    <Card.Text>Codigo {e.code}</Card.Text>
                                    <Card.Text>producto {e.name}</Card.Text>
                                    <Card.Text>brand {e.brand}</Card.Text>
                                    <Card.Text>Precio {e.price}</Card.Text>
                                    <Card.Text>Monto Total {e.totalMount}</Card.Text>
                                    <Card.Text>Proveedor {e.supplier}</Card.Text>
                                </>
                            )
                        })
                    }
                </Card.Body>
            </Card>
        </div>
    );
}