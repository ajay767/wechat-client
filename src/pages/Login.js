import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Context as AuthContext } from './../context/userContext';
import Input from '../components/Input';
import Button from '../components/Button';

function Login() {
  const history = useHistory();
  const { handleLogin, getUserData, isLoggedIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      console.log('getting user data', isLoggedIn);
      getUserData(history);
    }
    return () => {
      console.log('unmounting login');
      mounted = false;
    };
  }, [isLoggedIn]);

  return (
    <div className="p-2 px-4 mt-14 w-full my-auto">
      <h4 className="text-4xl text-green-600 font-bold text-center">Wechat</h4>
      <div className="w-full md:w-10/12 mx-auto mt-10">
        <Input value={name} setValue={setName} label="Name" type="text" />
        <Input value={email} setValue={setEmail} label="Email" type="email" />
        <Input
          value={password}
          setValue={setPassword}
          label="Password"
          type="password"
        />

        <Button onClick={() => handleLogin({ email, name, password }, history)}>
          Login
        </Button>
      </div>
      <p className="text-base text-center text-blue-600 my-10 font-medium cursor-pointer">
        Forgot password ?
      </p>
    </div>
  );
}

export default Login;
