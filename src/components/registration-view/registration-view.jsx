import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';
import './registration-view.scss';

export function RegistrationView(props) {
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [Email, setEmail] = useState('');
  const [Birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(Username, Password, Email, Birthday);
    props.onRegister(Username);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title>Please Register</Card.Title>
                <Form>
                  <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type='text' value={Username} onChange={e => setUsername(e.target.value)}
                      required placeholder="Enter a username" />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type='password' value={Password} onChange={e => setPassword(e.target.value)}
                      required placeholder="Your password must be 8 or more characters" />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type='email' value={Email} onChange={e => setEmail(e.target.value)}
                      required placeholder="Enter your email address" />
                  </Form.Group>


                  <Form.Group>
                    <Form.Label>Birthday</Form.Label>
                    <Form.Control
                      type='date' value={Birthday} onChange={e => setBirthday(e.target.value)} />
                  </Form.Group>

                  <Button type='submit' onClick={handleSubmit}>Register</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired
  }),
  onRegister: PropTypes.func.isRequired
};