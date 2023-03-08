import { React, useState } from "react";
import styles from "../../styles/SignInUpForm.module.css";
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import { useSetCurrentUser } from "../../context/CurrentUserContext";

const SignInForm = () => {
  const setCurrentUser = useSetCurrentUser;
  const [signInData, setSignInData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = signInData;

  const [errors, setErrors] = useState({});

  const history = useHistory();

  const handleChange = (event) => {
    setSignInData({
      ...signInData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axios.post("/dj-rest-auth/login/", signInData);
      setCurrentUser(data.user);
      history.push("/");
    } catch (err) {
      setErrors(err.response?.data);
    }
  };

  return (
    <Row>
      <Container className={styles.FormContainer}>
        <Col xs={6}>
          <Form onSubmit={handleSubmit} className={styles.Form}>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                value={username}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.username?.map((message, id) => (
              <Alert variant="warning" key={id}>
                {message}
              </Alert>
            ))}
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
            {errors.password?.map((message, id) => (
              <Alert variant="warning" key={id}>
                {message}
              </Alert>
            ))}
            <Button className={styles.FormButton} type="submit" variant="info">
              Sign in
            </Button>
            {errors.non_field_errors?.map((message, id) => (
              <Alert key={id} variant="warning">
                {message}
              </Alert>
            ))}
          </Form>
          <span>
            Don't have an account?
            <Link to="/signup">Sign in</Link>
          </span>
        </Col>
      </Container>
    </Row>
  );
};

export default SignInForm;
