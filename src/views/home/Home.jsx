import styles from './home.module.css';
import { Link } from 'react-router-dom';
//import Card from '../../components/card/card'

import { productos } from '../../assets/hardcodeo'


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
//import 'bootstrap/dist/css/bootstrap.min.css';

function GridExample() {
  return (
    <div className={styles.container}>
      <Row xs={1} md={2} className="g-4">
        {Array.from(productos).map((product, idx) => (
          <Col key={idx}>
            <Link to={`/productDetail/${product.id}`} className={styles.link}>
              <Card>
                { <Card.Img variant="top" /*src={product.image} alt={productos.name} width={'50px'} height={'100px'}*/ /> }
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>
                    {product.description}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default GridExample;




// export default function Home() {
//     return (
//         <div className={styles.container}>
//             <div className={styles.aside}>
//                 <div>
                    
//                 </div>
//             </div>
//             <div className={styles.cards}>
//                 {
//                     productos.length ? (
//                         productos.map((product, index) => {
//                             return (
//                                 <Card
//                                     key={index}
//                                     id={product.id}
//                                     name={product.name}
//                                     image={product.image}
//                                     price={product.price}
//                                     stock={product.stock}
//                                 />
//                             )
//                         })
//                     ) :
//                         <div className={styles.loading}>
//                             <h1 className={styles.loading}>LOADING...</h1>
//                         </div>
//                 }
//             </div>
//         </div>
        
//     )
// }

