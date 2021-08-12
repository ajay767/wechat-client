import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context as AuthContext } from './../context/userContext';

function withUser({ children }) {
  const Wrapper = ({ ...props }) => {
    const { isLoggedIn, user } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
      if (!isLoggedIn) {
        console.log('user is null', user);
        // history.push('/login');
      }
    });

    return <div {...props}>{children}</div>;
  };
  return Wrapper;
}

export default withUser;
