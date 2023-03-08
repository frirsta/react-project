import { React, useState } from "react";
import styles from "../../styles/SignInUpForm.module.css"
import Form from "react-bootstrap/Form";
import { Link, useHistory } from "react-router-dom";
import { Alert, Button, Col, Container, Row} from "react-bootstrap";
import axios from "axios";

const SignInUpForm = () => {
  const [ signUpData, setSignUpData ] = useState({
    username: "",
    password1: "",
    password2: "",
  });

  const { username, password1, password2 } = signUpData;

  const [errors, setErrors] = useState({

  })

  const history = useHistory();

  const handleChange = (event) => {
    setSignUpData({
      ...signUpData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('/dj-rest-auth/registration/', signUpData)
      history.push('/signin')
    } catch(err) {
      setErrors(err.response?.data)
    }
  }

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
      {errors.username?.map((message, id) => 
      <Alert variant="warning" key={id}>{message}</Alert>)}
      <Form.Group className="mb-3" controlId="password1">
        <Form.Label>Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Password"
        name="password1"
        value={password1}
        onChange={handleChange}
        />
      </Form.Group>
      {errors.password1?.map((message, id) => 
      <Alert variant="warning" key={id}>{message}</Alert>)}
      <Form.Group className="mb-3" controlId="password2">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
        type="password"
        placeholder="Confirm Password"
        name="password2"
        value={password2}
        onChange={handleChange}
        />
      </Form.Group>
      {errors.password2?.map((message, id) => 
      <Alert variant="warning" key={id}>{message}</Alert>)}
      <Button className={styles.FormButton} type="submit" variant="info">Sign up</Button>
      {errors.non_field_errors?.map((message, id) => (
        <Alert key={id} variant="warning">{message}</Alert>
      ))}
    </Form>
    <span>Already have an account?
    <Link to='/signin'>Sign in</Link></span>
    </Col>
    </Container>
    </Row>
  );
};

export default SignInUpForm;
