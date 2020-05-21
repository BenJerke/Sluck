import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, Link } from 'react-router-dom'
import "./login.css"
const socket = require('socket.io-client')('http://localhost:3002');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      password: '',
      passwordConfirm: '',
      email: '',
      UIDError: null,
      errors: null,
      redirect: false,
      isLoading: false
    };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, password, passwordConfirm, email } = this.state;
    this.setState({ name: '', password: '', passwordConfirm: '', email: '', isLoading: true });
    socket.emit("signup", name, password, passwordConfirm, email);
  };

  componentDidMount = () => {
    socket.on("signup", res => {
      if(res.length === 24)  {
        this.setState({redirect: true})
        console.log(res);
      }
      else {
        alert(res);
        this.refreshPage(true);
      };
    });
  }

  refreshPage() {
    window.location.reload(false);
  }

  showErrors = () => {
    const errors = this.state.errors;
    let errorMessages = [];
    if (errors !== null) {
      for (const error in errors) {
        errorMessages = [...errorMessages, ...errors[error]];
      }
    }
    return errorMessages;
  };
  render() {
    if (this.state.redirect) return (
      <Redirect to={{ pathname: '/channels', state: { user: this.state.user } }} />
    );;

    return (
      <React.Fragment>
        <header
          className="signup bounce-5"
          style={{
            fontSize: 40,
            fontFamily: "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif",
            padding: 10
          }}>
          Sign Up
        </header>
        <Row
          className='d-flex justify-content-center align-items-center w-100 mt-5'
          style={{
            minHeight: '10%',
            fontSize: 15,
          }}
        >
          <Col>
            {this.state.errors !== null && (
              <Alert variant='danger'>
                <ul>
                  {this.showErrors().map(err => (
                    <li key={err}>{err}</li>
                  ))}
                </ul>
              </Alert>
            )}
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId='username'
                style={{
                  padding: 6
                }}>
                <Form.Label >Username{"\n"}</Form.Label>
                <Form.Control
                  required
                  type='name'
                  name='name'
                  value={this.state.name}
                  placeholder='Choose a username'
                  onChange={this.handleChange}

                />
                <span></span>

              </Form.Group>
              <Form.Group controlId='email'
                style={{
                  padding: 6
                }}>
                <Form.Label>Email Address:{"\n"}</Form.Label>
                <Form.Control
                  required
                  type='email'
                  name='email'
                  value={this.state.email}
                  placeholder='Your email address'
                  onChange={this.handleChange}
                />
                <span></span>
              </Form.Group>

              <Form.Group
                style={{
                  padding: 6
                }}>
                <Form.Label>Password:{"\n"}</Form.Label>
                <Form.Control
                  required
                  type='password'
                  name='password'
                  value={this.state.password}
                  placeholder='Choose a password'
                  onChange={this.handleChange}
                />
                <span></span>
              </Form.Group>
              <Form.Group
                style={{
                  padding: 6
                }}>
                <Form.Label>Confirm Password:{"\n"}</Form.Label>
                <Form.Control
                  required
                  type='passwordConfirm'
                  name='passwordConfirm'
                  value={this.state.passwordConfirm}
                  placeholder='Re-enter your password'
                  onChange={this.handleChange}
                />
                <span></span>
              </Form.Group>

              <Button
                disabled={this.state.isLoading}
                variant='primary'
                type='submit'
                className='btn-block'
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
                        Please wait...
                      </>
                ) : (
                    <span>Create My Account</span>
                  )}
              </Button>
              <p className='pt-3'>
                Already have an account? <Link to='/'>Login</Link>
              </p>
            </Form>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default Login;
