import React, { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { AuthContext } from '../App';

const Login = () => {
  const { API_URL, login } = useContext(AuthContext);
  
  return (
    <div className="container mt-5">
      <LoginForm API_URL={API_URL} login={login} />
    </div>
  );
};

export default Login;