import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CometChat } from '@cometchat-pro/chat';
import './App.css';

CometChat.init(process.env.PROJECT_THREE_KEY)
.then(()=>{
  console.log('Working');
})
.catch(() => {
  console.log('RIP');
})

ReactDOM.render(<App />, document.getElementById('root'));