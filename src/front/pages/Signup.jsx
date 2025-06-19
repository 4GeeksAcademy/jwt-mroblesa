import React, { useContext } from 'react';
import SignupForm from '../components/SignupForm';
import { AuthContext } from '../App';

const Signup = () => {
  const { API_URL } = useContext(AuthContext);
  
  return (
    <div className="container mt-5">
      <SignupForm API_URL={API_URL} />
    </div>
  );
};

export default Signup;