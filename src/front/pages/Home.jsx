import React, { useContext } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Home = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img src={rigoImageUrl} className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        {isLoggedIn ? (
          <>
            <p>¡Bienvenido de vuelta!</p>
            <p>Accede a tu <Link to="/private">área privada</Link></p>
          </>
        ) : (
          <>
            <p>Bienvenido a nuestra aplicación</p>
            <p>
              Por favor <Link to="/login">inicia sesión</Link> o <Link to="/signup">regístrate</Link> para continuar
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;