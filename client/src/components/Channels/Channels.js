import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import { Redirect } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';
import { v1 as uuid} from 'uuid';
import "./channels.css"

class Channels extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
            user: null,
            receiverID: 'supergroup',
            messageText: '',
            messages:[],
            authToken:null,
            messageType: CometChat.MESSAGE_TYPE.TEXT,
            receiverType: CometChat.RECEIVER_TYPE.GROUP,
        };
    }

    componentDidMount() {
        this.setState({ user: this.props.location.state.user }, console.log(this.state));
        this.getUser();
        this.receiveMessages();

      
      }

      getUser = () => {
        CometChat.login().then(
          user => {
            this.joinGroup();
          },
          error => {
            const authToken = localStorage.getItem('cometchat:authToken');
            if (authToken !== null) {
              this.setState({ authToken }, () => {
                this.reAuthenticateUserWithToken(this.state.authToken);
              });
            } else {
            }
          }
        );
      };

      joinGroup = () => {
        const GUID = this.state.receiverID;
        const password = '';
        const groupType = CometChat.GROUP_TYPE.PUBLIC;
        CometChat.joinGroup(GUID, groupType, password).then(
          group => {},
          error => {
            if (error.code === 'ERR_ALREADY_JOINED') {
              this.reAuthenticateUserWithToken();
            }
          }
        );
      };

      fetchMessages = () => {
        const GUID = this.state.receiverID;
        const limit = 30;
        const messagesRequest = new CometChat.MessagesRequestBuilder()
          .setGUID(GUID)
          .setLimit(limit)
          .build();
        messagesRequest.fetchPrevious().then(
          messages => {
            const textMessages = messages.filter(msg => msg.type === 'text');
            this.setState({ messages: [...textMessages] });
            this.scrollToBottom();
          },
          error => {
            console.log('Message fetching failed with error:', error);
          }
        );
      };

      scrollToBottom = () => {
        const page = document.querySelector('.page');
        page.scrollTop = page.scrollHeight;
      };

      handleChange = e => {
        this.setState({ messageText: e.target.value });
      };

      receiveMessages = () => {
        const listenerID = 'supergroup';
        CometChat.addMessageListener(
          listenerID,
          new CometChat.MessageListener({
            onTextMessageReceived: textMessage => {
              const oldMessages = this.state.messages;
              oldMessages.push(textMessage);
              this.setState(
                {
                  messages: [...oldMessages]
                },
                () => this.scrollToBottom()
              );
            }
          })
        );
      }

      logout = () => {
        CometChat.logout().then(() => {
          localStorage.removeItem('cometchat:authToken');
          this.setState({ redirect: true });
        });
      };

    render() {
        if (this.state.redirect) return <Redirect to='/' />;
        return(
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