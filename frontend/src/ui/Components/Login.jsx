import React from "react";
import "../Styles/Login.css";
import pawPrint from "../../assets/react.svg";

const Login = () => {
  return (
    <div className="login-bg-full">
      <form className="login-form-full">
        <img src={pawPrint} alt="Paw Print" className="login-logo-full" />
        <h2>Bienvenido</h2>
        <input type="text" placeholder="Usuario" className="login-input-full" />
        <input type="password" placeholder="Contraseña" className="login-input-full" />
        <button type="submit" className="login-btn-full">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
