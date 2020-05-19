import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, Link } from 'react-router-dom'
import "./home.css"
const socket = require('socket.io-client')('http://localhost:3002');

class Home extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      username: '',
      password: '',
      user: null,
      error: null,
      redirect: false,
      isLoading: false
    };
  }
  
  componentDidMount = () => {
    socket.on("login", res => {
      if(res === "1"){
        this.setState({redirect: true});
      }
      else{
        alert(res);
      };
    });
  };

  handleChange = e => {
    this.setState({ username: e.target.value });
  };

  handleChangeP = e => {
    this.setState({ password: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    this.setState({ username: '', password: '', isLoading: true });
    socket.emit("login", username, password);
  };

  render() {
    if (this.state.redirect)
      return (
        <Redirect to={{ pathname: '/channels', user: this.state.user }} />
      );
    return (
      <div>
        <header
          className="header bounce-5">
          Welcome
                </header>
        <Row
          className='d-flex justify-content-center align-items-center w-100 mt-5'
          style={{
            minHeight: '100%',
            textAlign: "center",
            fontSize: 15,


          }}
        >
          <Col xs={10} sm={10} md={4} lg={4} className='mx-auto mt-5'>
            {this.state.error !== null && (
              <Alert variant='danger'>{this.state.error}</Alert>
            )}

            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='username'
                style={{
                  padding: 10,
                  fontFamily: "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif"
                }}>
                <Form.Label>Username{"\n"}</Form.Label>
                <br></br>

                <Form.Control
                  required
                  type='text'
                  value={this.state.username}
                  placeholder='Enter your Username'
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId='password'
                style={{
                  padding: 10,
                  fontFamily: "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif"
                }}>
                <Form.Label>Password{"\n"}</Form.Label>
                <br></br>

                <Form.Control
                  required
                  type='text'
                  value={this.state.password}
                  placeholder='Enter your password'
                  onChange={this.handleChangeP}
                />
              </Form.Group>

              <Button
                disabled={this.state.isLoading}
                variant='primary'
                type='submit'
                className='btn-block'
                style={{

                }}
              >
                {this.state.isLoading ? (
                  <>
                    <Spinner
                      as='span'
                      animation='grow'
                      size='sm'
                      role='status'
                      aria-hidden='true'
                    />
                  Loading...
                </>

                ) : (

                    <span>Login</span>

                  )}


              </Button>


              <p className='pt-3'>
                Don't have an account with Sluck? <Link to='/login'>Create One Here!</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </div>
    )
  }
}


export default Home;
