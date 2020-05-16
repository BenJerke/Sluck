import React from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, Link } from 'react-router-dom'
import "./login.css"

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        uid: '',
        name: '',
        email: '',
        UIDError: null,
        errors: null,
        redirect: false,
        isLoading: false
      };
    }
  
    handleChange = e => {
    if (e.target.name === 'uid') {
      const uid = e.target.value;
      if (uid.indexOf(' ') > 0) {
        this.setState(
          { UIDError: 'Username cannot contain white spaces' },
          () => {
            console.log(this.state.UIDError);
          }
        );
      } else {
        this.setState({ UIDError: null });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };
  
  handleSubmit = e => {
    e.preventDefault();
    const { uid, name, email } = this.state;
    this.setState({ uid: '', name: '', email: '', isLoading: true });
    fetch('https://api.cometondemand.net/api/v2/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'api-key': process.env.PROJECT_THREE_KEY
      },
      body: JSON.stringify({
        uid,
        name,
        email
      })
    })
    .then(response => response.json())
    .then(data => {
      const error = data.error;
      if (error) {
        this.setState(
          {
            isLoading: false,
            errors: { ...error.details }
          },
          () => {
            this.showErrors();
          }
        );
        return;
      }
      this.setState({
        isLoading: false,
        redirect: true
      });
    });
  };
  
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
      if (this.state.redirect) return  (
        <Redirect to={{ pathname: '/channels', state:{user: this.state.user}}} /> 
        ); ;

      return (
        <React.Fragment>
          <Row
            className='d-flex justify-content-center align-items-center w-100 mt-5'
            style={{
              minHeight: '25%',
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
                
              }}>
                <Form.Label >User ID{"\n"}</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='uid'
                  value={this.state.uid}
                  placeholder='Choose a username'
                  onChange={this.handleChange}
                />
                {this.state.UIDError !== null && (
                  <Form.Control.Feedback
                    style={{ display: 'block',
                  }}
                    type='invalid'
                  >
                    {this.state.UIDError}
                  </Form.Control.Feedback>
                )}
                </Form.Group>
                  <Form.Group controlId='display-name'
                   style={{
                    
                  }}>
                    <Form.Label>Name{"\n"}</Form.Label>
                    <Form.Control
                      required
                      type='text'
                      name='name'
                      value={this.state.name}
                      placeholder='What is your name?'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group controlId='email'
                  style={{
                    
                  }}> 
                    <Form.Label>Email Address{"\n"}</Form.Label>
                    <Form.Control
                      required
                      type='email'
                      name='email'
                      value={this.state.email}
                      placeholder='Your email address'
                      onChange={this.handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>Password{"\n"}</Form.Label>
                  <Form.Control
                  required
                  type='password'
                  name='password'
                  value={this.state.password}
                  placeholder='Choose a password'
                  onChange={this.handleChange}
                  />
                  </Form.Group>
                  <Form.Group>
                  <Form.Label>ConfirmPassword{"\n"}</Form.Label>
                  <Form.Control
                  required
                  type='passwordConfirm'
                  name='passwordConfirm'
                  value={this.state.passwordConfirm}
                  placeholder='Re-enter your password'
                  onChange={this.handleChange}
                  />
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
  