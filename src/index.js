import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as UserProvider } from './context/userContext';
import { Provider as ChatProvider } from './context/chatContext';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import './index.scss';

import App from './App';

ReactDOM.render(
  <Router>
    <UserProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </UserProvider>
  </Router>,
  document.getElementById('root')
);
