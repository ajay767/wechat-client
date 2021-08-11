import React, { useReducer } from 'react';

const MESSAGE_SEND = 'MESSAGE_SEND';
const MESSAGE_RECEIVED = 'MESSAGE_RECEIVED';
const CLEAR_MESSAGE = 'CLEAR_MESSAGE';
const NOTICE = 'NOTICE';

export const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case MESSAGE_RECEIVED: {
      const newState = { ...state };
      newState.chat.push({
        message: action.message,
        type: 'received',
        author: action.author,
      });
      return newState;
    }
    case MESSAGE_SEND: {
      const newState = { ...state };
      newState.chat.push({
        message: action.message,
        type: 'sent',
        author: action.author,
      });
      return newState;
    }
    case NOTICE: {
      const newState = { ...state };
      newState.chat.push({
        message: action.message,
        type: 'notice',
      });
      return newState;
    }
    case CLEAR_MESSAGE: {
      return { chat: [] };
    }
    default: {
      return state;
    }
  }
};

export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    chat: [],
  });

  const sendMessage = ({ message, author }) => {
    dispatch({ type: MESSAGE_SEND, message, author });
  };

  const receiveMessage = ({ message, author }) => {
    dispatch({ type: MESSAGE_RECEIVED, message, author });
  };

  const handleNotice = (message) => {
    dispatch({ type: NOTICE, message });
  };

  const clearMessages = () => {
    dispatch({ type: CLEAR_MESSAGE });
  };

  return (
    <Context.Provider
      value={{
        ...state,
        sendMessage,
        receiveMessage,
        handleNotice,
        clearMessages,
      }}
    >
      {children}
    </Context.Provider>
  );
};
