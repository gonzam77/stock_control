import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Aside() {
  return (
    <>
      <Navbar className="bg-body-tertiary" >
        <Container >
          <Navbar.Brand href="/nomenclators">Nomencladores</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand  href='/products' >Brand text</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Otro Menu</Navbar.Brand>
        </Container>
      </Navbar>
      <br />
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">
            
            React Bootstrap
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Aside;