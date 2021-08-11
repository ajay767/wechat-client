import React, { useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import Button from './Button';
import { Context as authContext } from './../context/userContext';

function Header() {
  const history = useHistory();
  const { getUserData, isLoggedIn, handleLogout } = useContext(authContext);

  useEffect(() => {
    getUserData(history);
  }, [isLoggedIn]);

  return (
    <div className="flex items-center justify-between border-b-2 border-gray-100 p-2">
      <NavLink to="/">
        <h4 className="text-2xl text-green-600 font-bold">
          Wechat<span className="text-base ml-2">v1.0</span>
        </h4>
      </NavLink>
      {isLoggedIn && (
        <Button onClick={() => handleLogout(history)}>Logout</Button>
      )}
    </div>
  );
}

export default Header;
