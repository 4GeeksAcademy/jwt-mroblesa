import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateArea = ({ API_URL }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (!isLoggedIn) return;

    const fetchPrivateData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_URL}/private`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message);
        } else {
          setError('No tienes acceso a esta área');
        }
      } catch (err) {
        setError('Error de conexión con el servidor');
      }
    };

    fetchPrivateData();
  }, [API_URL, isLoggedIn, navigate]);

  return (
    <div>
      <h2>Área Privada</h2>
      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="alert alert-success">
          <p>{message}</p>
          <p>¡Bienvenido a tu área privada!</p>
        </div>
      )}
    </div>
  );
};

export default PrivateArea;