import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ResetPassword = () => {
  function validarEmail(email) {
    const expresionRegular = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return expresionRegular.test(email);
  }

  const [email, setEmail] = useState("");
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || !validarEmail(email)) {
      setAlerta({
        error: true,
        msg: "El email es obligatorio y debe ser válido",
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    try {
      // Enviar email para resetear password
      await clienteAxios.post("veterinarios/resetPassword", { email });
      setAlerta({
        error: false,
        msg: "Email enviado con éxito",
      });
      setTimeout(() => {
        setAlerta({});
        navigate("/");
      }, 2000);
      return;
    } catch (error) {
      setAlerta({
        error: true,
        msg: "Error al enviar el email",
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
      <div className="text-indigo-600 font-black text-3xl mt-32">
        Recupera tu cuenta
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-8 text-indigo-600">
          {alerta.msg ? <Alerta alerta={alerta} /> : null}
          Reset Password
        </h2>
        <form action="" className="mt-3">
          <div className="mt-3">
            <label htmlFor="email" className="font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border border-gray-400 rounded-md block w-full p-2"
              placeholder="Introduce tu email y te enviaremos un enlace "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
        <div className="mt-3 flex justify-between">
          <Link to="/" className="text-indigo-600 font-bold">
            ¿Ya tienes una Cuenta? Inicia Sesión
          </Link>
          <Link to="/registrar" className="text-indigo-600 font-bold">
            ¿No tienes cuenta? Regístrate
          </Link>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
