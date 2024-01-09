import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from './cardDetail.module.css'

function CardDetail({
  name,
  code,
  id,
  unidad_medida,
  cant_min,
  cant_max,
  price,
  stock,
  proveedor,
  description,
  marca,
}) 
{
    console.log(id);
  return (
    <div className={styles.container}>
      <Card className="text-center">
        <Card.Header>Producto</Card.Header>
        <Card.Body>
          <Card.Title>
            {name} {marca}
          </Card.Title>
          <Card.Text>COD: {code}</Card.Text>
          <Card.Text>Precio: {price}</Card.Text>
          <Card.Text>Stock: {stock}</Card.Text>
          <Card.Text>Cant Min: {cant_min}</Card.Text>
          <Card.Text>Cant Max {cant_max}</Card.Text>
          <Card.Text>Proveedor: {proveedor}</Card.Text>
          <Card.Text>unidad_medida: {unidad_medida}</Card.Text>
          <Card.Text>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
    </div>
  );
}

export default CardDetail;
