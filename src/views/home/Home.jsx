import styles from './home.module.css'
//import Card from '../../components/card/card'

import { productos } from '../../assets/hardcodeo'


import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import 'bootstrap/dist/css/bootstrap.min.css';

function GridExample() {
  return (
    <Row xs={1} md={2} className="g-4">
      {Array.from(productos).map((product, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
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

