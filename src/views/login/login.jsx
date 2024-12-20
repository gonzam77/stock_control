import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import styles from "./login.module.css";

function Login({ login }) {

  const [userLogin, setUserLogin] = useState({
    nombre: '',
    clave: '',
  });

  function handleChange(event) {
    const target = event.target.name;
    const value = event.target.value;
    setUserLogin({
      ...userLogin,
      [target]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    login(userLogin);
  }

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Nombre Usuario</Form.Label>
          <Form.Control
            value={userLogin.nombre}
            name="nombre"
            placeholder="Ingrese el usuario"
            onChange={handleChange}
            type="text"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicclave">
          <Form.Label>clave</Form.Label>
          <Form.Control
            onKeyDown={handleKeyDown}
            value={userLogin.clave}
            name="clave"
            placeholder="clave"
            onChange={handleChange}
            type="password"
          />
        </Form.Group>
        {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
        </Form.Group> */}
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
}

export default Login;
