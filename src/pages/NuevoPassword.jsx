import React, { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import { useParams, useNavigate } from "react-router-dom";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState("");
  const [repitepassword, setRepitePassword] = useState("");
  const [tokenValido, setTokenValido] = useState(false);

  const { token } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        const respuesta = await clienteAxios(
          `/veterinarios/resetPassword/${token}`
        );
        if (respuesta.status === 200) {
          setTokenValido(true);
        }
        setAlerta({
          error: false,
          msg: "Todo Correcto, puedes cambiar tu contraseña",
        });
        setTimeout(() => {
          setAlerta({});
        }, 2000);
        return;
      } catch (error) {
        setAlerta({
          error: true,
          msg: "Token invalido",
        });
        setTimeout(() => {
          setAlerta({});
        }, 2000);
        return;
      }
    };
    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.trim() === "" || repitepassword.trim() === "") {
      setAlerta({
        error: true,
        msg: "Todos los campos son obligatorios",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    if (password !== repitepassword) {
      setAlerta({
        error: true,
        msg: "Las contraseñas no coinciden",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    try {
      const {data} = await clienteAxios.post(`/veterinarios/resetPassword/${token}`, {
        password,
      });
      setAlerta({
        error: false,
        msg: "Contraseña cambiada correctamente",
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
      return;
    } catch (error) {
      setAlerta({
        error: true,
        msg: "Error al cambiar la contraseña",
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
      return;
    }
  };

  return (
    <>
      {tokenValido ? (
        <>
          <div className="text-indigo-600 font-black text-3xl mt-32">
            Resetea tu contraseña
          </div>
          <div>
            <h2 className="text-2xl font-bold mt-8 text-indigo-600">
              {alerta.msg ? <Alerta alerta={alerta} /> : null}
              Reset Password
            </h2>
            <form action="" className="mt-3">
              <div className="mt-3">
                <label htmlFor="password" className="font-bold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="border border-gray-400 rounded-md block w-full p-2"
                  placeholder="Introduce tu password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label htmlFor="repitepassword" className="font-bold">
                  Repite Password
                </label>
                <input
                  type="password"
                  id="repitepassword"
                  name="repitepassword"
                  className="border border-gray-400 rounded-md block w-full p-2"
                  placeholder="Repite password"
                  value={repitepassword}
                  onChange={(e) => setRepitePassword(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  className="bg-indigo-600 text-white rounded-md px-4 py-2 w-full"
                  onClick={handleSubmit}
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </>
      ) : (
        <>
          <h1>Ha habido un problema</h1>
        </>
      )}
    </>
  );
};

export default NuevoPassword;
