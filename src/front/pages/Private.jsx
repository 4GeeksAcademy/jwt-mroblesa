import React, { useContext } from 'react';
import PrivateArea from '../components/PrivateArea';
import { AuthContext } from '../App';

const Private = () => {
  const { API_URL, isLoggedIn } = useContext(AuthContext);
  
  if (!isLoggedIn) {
    return (
      <div className="container mt-5">
        <div className="alert alert-warning">
          Debes <a href="/login">iniciar sesión</a> para acceder a esta área
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <PrivateArea API_URL={API_URL} />
    </div>
  );
};

export default Private;