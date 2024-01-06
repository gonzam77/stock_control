
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import styles from './card.module.css'

function BasicExample({ id, name, marca, price, stock, description}) {
  return (
    <Card className={styles.card} style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name} {marca}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>Sock: {stock}</Card.Text>
        <Card.Text>Precio: {price}</Card.Text>
        <Link to={`/detail/${id}`}>
            <Button variant="info">Modificar</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export default BasicExample;