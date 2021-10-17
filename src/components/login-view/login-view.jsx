import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios.post('https://myflix-api-00001.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };


  return (
<<<<<<< HEAD
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Log In</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                  </Form.Group>

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                  </Form.Group>

                  <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
=======
    <Form>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
<<<<<<< Updated upstream
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
=======
        <Form.Control type="text" placeholder="Enter Username" onChange={e => setUsername(e.target.value)} />
>>>>>>> Stashed changes
      </Form.Group>

      <Form.Group controlId="formPassword">
        <Form.Label>Password:</Form.Label>
<<<<<<< Updated upstream
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
=======
        <Form.Control type="password" placeholder="Enter Password" onChange={e => setPassword(e.target.value)} />
>>>>>>> Stashed changes
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
>>>>>>> main
  );
}


LoginView.propTypes = {
  login: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired

  }).isRequired,
  onLoggedIn: PropTypes.func.isRequired
};