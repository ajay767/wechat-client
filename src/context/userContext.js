import React, { useReducer } from 'react';

export const Context = React.createContext();

export const Provider = ({ children }) => {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN': {
        return { ...state, user: action.payload, isLoggedIn: true };
      }
      case 'LOGOUT': {
        return { ...state, user: null, isLoggedIn: false };
      }
      case 'GET_USER': {
        return { ...state, user: action.payload, isLoggedIn: true };
      }
      default: {
        return state;
      }
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    isLoggedIn: false,
    user: null,
  });

  const handleLogin = (userData, history) => {
    localStorage.setItem('userData', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
    history.push('/');
  };

  const handleLogout = () => {
    localStorage.removeItem('userData');
    dispatch({ type: 'LOGOUT' });
    // history.push('/');
  };

  const getUserData = (history) => {
    const data = localStorage.getItem('userData');

    if (data) {
      return dispatch({ type: 'GET_USER', payload: JSON.parse(data) });
    }
    history.push('/login');
  };

  return (
    <Context.Provider
      value={{ ...state, handleLogin, handleLogout, getUserData }}
    >
      {children}
    </Context.Provider>
  );
};

// eslint-disable-next-line import/no-anonymous-default-export
// export default { Context, Provider };
