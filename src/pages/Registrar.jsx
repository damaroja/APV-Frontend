import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const Registrar = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repitePassword, setRepitePassword] = useState("");

  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  function validarEmail(email) {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegular.test(email);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([nombre, email, password, repitePassword].includes("")) {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    if (password !== repitePassword) {
      setAlerta({
        error: true,
        msg: "Las contraseñas no coinciden",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    if (!validarEmail(email)) {
      setAlerta({
        error: true,
        msg: "El email no es válido",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    try {
      await clienteAxios.post(
        '/veterinarios/registrar',
        {
          nombre,
          email,
          password,
        }
      );
      setAlerta({
        error: false,
        msg: "Usuario registrado correctamente",
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
      return;
    } catch (error) {
      setAlerta({
        error: true,
        msg: "Error al registrar el usuario",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
  };

  return (
    <>
      <div className="text-indigo-600 font-black text-3xl mt-32">
        Registrate para gestionar tus pacientes
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-8 text-indigo-600">Registro</h2>
        { alerta.msg ? <Alerta alerta={alerta} /> : null }
        <form action="" className="mt-3">
          <div>
            <label htmlFor="nombre" className="font-bold">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              className="border border-gray-400 rounded-md block w-full p-2"
              placeholder="Introduce tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-md block w-full p-2"
              placeholder="Introduce tu email"
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
            <label htmlFor="repitePassword" className="font-bold">
              Repite tu contraseña
            </label>
            <input
              type="password"
              id="repitePassword"
              name="repitePassword"
              className="border border-gray-400 rounded-md block w-full p-2"
              value={repitePassword}
              onChange={(e) => setRepitePassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="bg-indigo-600 text-white rounded-md px-4 py-2 w-full"
              onClick={handleSubmit}
            >
              Crear Cuenta
            </button>
          </div>
        </form>
        <div className="mt-3 flex justify-between">
          <Link to="/resetPassword" className="text-indigo-600 font-bold">
            ¿Olvidaste tu contraseña?
          </Link>
          <Link to="/" className="text-indigo-600 font-bold">
            ¿Ya tienes una Cuenta? Inicia Sesión
          </Link>
        </div>
      </div>
    </>
  );
};

export default Registrar;
