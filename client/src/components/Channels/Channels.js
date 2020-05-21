import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Redirect } from 'react-router-dom';
import { v1 as uuid } from 'uuid';
import "./channels.css"
const socket = require('socket.io-client')('http://localhost:3002');

class Channels extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      redirect: false,
      user: null,
      messageText: '',
      messages: [],
    };
  };

  componentDidMount() {
    socket.emit("user");
    socket.on("user", user => this.setState({user: user}));
    socket.on("messages", message => this.setState({messages: this.state.messages.push(message)}));
  };
  

  scrollToBottom = () => {
    const page = document.querySelector('.page');
    page.scrollTop = page.scrollHeight;
  };

  handleChange = e => {
    this.setState({ messageText: e.target.value });
    console.log(e);
  };

  sendMessage = () => {
    socket.emit("message", this.messageText);
  };

  receiveMessages = () => {

  };

  logout = () => {
  };

  render() {
    if (this.state.redirect) return <Redirect to='/' />;
    return (
      <div>
        <Row>
          <Col>
            <Container
              className="Logout">
              <div className='d-flex align-items-center justify-content-between'>
                <h3 className='text-center py-3 d-inline'>

                </h3>
              </div>
              <ul className='list-group' style={{ marginBottom: '500px' }}>
                {this.state.messages.length > 0 ? (
                  this.state.messages.map(msg => (
                    <li className='list-group-item' key={uuid()}>
                      <strong>{msg.sender.name}</strong>
                      <p>{msg.text}</p>
                    </li>
                  ))
                ) : (
                    <div className=''>
                      <p className=''></p>
                    </div>
                  )}
              </ul>
            </Container>
          </Col>
        </Row>
        <Navbar>
          <Container>
            <Form
              className=''
              onSubmit={this.sendMessage}
            >
              <Form.Group>
                <Form.Control
                  className="text"
                  value={this.state.messageText}
                  required
                  type='text'
                  placeholder='Type Message here...'
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant='primary' type='submit' className="send">
                Send
                    </Button>
            </Form>
          </Container>
        </Navbar>



      </div>

    )
  }
}

export default Channels;  