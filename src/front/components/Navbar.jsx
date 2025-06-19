import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Mi App</Link>
        
        <div className="d-flex">
          {isLoggedIn ? (
            <button 
              className="btn btn-outline-danger" 
              onClick={handleLogout}
            >
              Cerrar Sesión
            </button>
          ) : (
            <>
              <Link className="btn btn-outline-primary me-2" to="/login">
                Iniciar Sesión
              </Link>
              <Link className="btn btn-primary" to="/signup">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;