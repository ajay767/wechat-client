import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context as AuthContext } from './../context/userContext';

function withUser({ children }) {
  const Wrapper = () => {
    const { isLoggedIn } = useContext(AuthContext);
    const history = useHistory();

    useEffect(() => {
      if (!isLoggedIn) {
        history.push('/login');
      }
    }, []);

    return <>{children}</>;
  };
  return Wrapper;
}

export default withUser;
