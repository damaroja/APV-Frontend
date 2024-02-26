import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const Login = () => {
  function validarEmail(email) {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegular.test(email);
  }

  const { setAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    if (!validarEmail(email)) {
      setAlerta({
        error: true,
        msg: "El email no es valido",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    try {
      const {data} = await clienteAxios.post("/veterinarios/login", {
        email,
        password,
      });
      setAuth(data);
      localStorage.setItem("token-APV-0001", data.token);
      setAlerta({
        error: false,
        msg: "Iniciando Sesión",
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/admin");
      }, 2000);
    } catch (error) {
      console.log(error);
      setAlerta({
        error: true,
        msg: error.response.data.msg,
      });
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
    }
  };

  return (
    <>
      <div className="text-indigo-600 font-black text-3xl mt-32">
        Inicia Sesión y administra tus pacientes
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-3 text-indigo-600">
          Inicia Sesión
        </h2>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}
        <form action="" className="mt-3">
          <div>
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-md block w-full p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="password" className="font-bold">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="border border-gray-400 rounded-md block w-full p-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
        <div className="mt-3 flex justify-between">
          <Link to="/resetPassword" className="text-indigo-600 font-bold">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/registrar" className="text-indigo-600 font-bold">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
