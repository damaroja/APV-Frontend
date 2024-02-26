import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";


const CambiarPassword = () => {
  const [passwordActual, setPasswordActual] = useState("");
  const [password, setPassword] = useState("");
  const [confirmaPassword, setConfirmaPassword] = useState("");
  const [alerta, setAlerta] = useState({});

    const { guardarPassword } = useAuth();

    const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      passwordActual.trim() === "" ||
      password.trim() === "" ||
      confirmaPassword.trim() === ""
    ) {
      setAlerta({
        msg: "Todos los campos son obligatorios",
        error: true
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
    }
    if (password !== confirmaPassword) {
      setAlerta({
        msg: "Los passwords no coinciden",
        error: true
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      return
    }
    if (password.length < 3) {
      setAlerta({
        msg: "El password debe tener al menos 3 caracteres",
        error: true
      });
      setTimeout(() => {
        setAlerta({})
      }, 2000);
      return
    }
    try {
        await guardarPassword({ passwordActual, password });
        setTimeout(() => {
            navigate('/admin/perfil')
        }, 2000);
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <>
      <nav>
        <Link
          to="/admin/perfil"
          className="inline-block text-sm px-4 py-2 leading-none border rounded border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 uppercase"
        >
          Perfil
        </Link>
        <h1 className="text-4xl text-center mt-9 font-bold">
          Cambiar Password
        </h1>
        <p className="text-center mt-4">Modifica tu password aqui</p>
        <form className=" max-w-sm m-auto mt-5" onSubmit={handleSubmit}>
          {alerta.msg ? <Alerta alerta={alerta} /> : null}
          <div className="md:flex md:items-center mb-6">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="actualPassword"
            >
              Password Actual
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
              id="actualPassword"
              type="password"
              placeholder="******************"
              value={passwordActual}
              onChange={(e) => setPasswordActual(e.target.value)}
            />
          </div>
          <div className="md:flex md:items-center mb-6">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Nuevo Password
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="md:flex md:items-center mb-6">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-password"
            >
              Confirmar Nuevo Password
            </label>
            <input
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
              id="confirmaPassword"
              type="password"
              placeholder="******************"
              value={confirmaPassword}
              onChange={(e) => setConfirmaPassword(e.target.value)}
            />
          </div>
          <div className="md:flex md:items-center">
            <div className="md:w-1/3"></div>
            <div className="md:w-2/3">
              <button
                className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Cambiar Password
              </button>
            </div>
          </div>
        </form>
      </nav>
    </>
  );
};

export default CambiarPassword;
