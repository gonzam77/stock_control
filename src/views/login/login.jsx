import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import styles from "./login.module.css";

function Login({ login }) {

  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
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

  return (
    <div className={styles.container}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={userLogin.email}
            name="email"
            placeholder="Ingrese el usuario"
            onChange={handleChange}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={userLogin.password}
            name="password"
            placeholder="Password"
            onChange={handleChange}
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
