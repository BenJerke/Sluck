import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Alert from 'react-bootstrap/Alert'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, Link } from 'react-router-dom'
import { CometChat } from '@cometchat-pro/chat'
import "./home.css"



class Home extends React.Component {
    constructor(prop) {
        super(prop);
        this.state = {
            username: '',
            user: null,
            error: null,
            redirect: false,
            isLoading: false
        };
    }

    handleChange = e => {
        this.setState({ username: e.target.value });
      };
      
      handleSubmit = e => {
        e.preventDefault();
        const username = this.state.username;
        this.setState({ username: '', isLoading: true });
        CometChat.login(username, process.env.PROJECT_THREE_KEY)
        .then(user => {
          this.setState({ redirect: true, user, isLoading: false });
          localStorage.setItem('cometchat:authToken', user.authToken);
        })
        .catch(err => {
          this.setState({ error: err.message, isLoading: false });
        });
      };
      render(){
          if(this.state.redirect)
          return (
          <Redirect to={{ pathname: '/channels', user: this.state.user}} /> 
          );
        return(
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
            style={{padding: 10,
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
            style={{padding: 10,
              fontFamily: "Avantgarde, TeX Gyre Adventor, URW Gothic L, sans-serif"
            }}>
              <Form.Label>Password{"\n"}</Form.Label>
              <br></br>

              <Form.Control
                required
                type="text"
                value={this.state.password}
                placeholder='Enter your password'
                onChange={this.handleChange}
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