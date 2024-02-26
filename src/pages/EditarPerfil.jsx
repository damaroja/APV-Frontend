import { useEffect, useState } from "react";
import AdminNav from "../components/AdminNav";
import useAuth from "../hooks/useAuth";
import Alerta from "../components/Alerta";
import { useNavigate } from "react-router-dom";

const EditarPerfil = () => {
  const { auth, actualizarPerfil } = useAuth();
  const [perfil, setPerfil] = useState({});
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setPerfil(auth);
  }, [auth]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre, email, telefono, web } = perfil;
    if (nombre.trim() === "" || email.trim() === "") {
      setAlerta({
        error: true,
        msg: "Los campos nombre y Email son obligatorios",
      });
      setTimeout(() => {
        setAlerta({});
        window.location.reload();
      }, 2000);
      return;
    }
    if (
      telefono == null ||
      web == null ||
      telefono.trim() === "" ||
      web.trim() === ""
    ) {
      const respuesta = confirm(
        "¿Estas seguro de no querer agregar telefono o web?"
      );
      if (respuesta) {
        await actualizarPerfil(perfil);
      } else {
        setAlerta({
          msg: "Redirigiendo...",
          error: false,
        });
        setTimeout(() => {
          setAlerta({});
          navigate("/admin");
        }, 2000);
        return;
      }
    }
    await actualizarPerfil(perfil);
    setAlerta({
      msg: "Redirigiendo...",
      error: false,
    });
    setTimeout(() => {
      setAlerta({});
      navigate("/admin");
    }, 2000);
    return;
  };

  return (
    <>
      <AdminNav />
      <h1 className="text-4xl text-center mt-9 font-bold">Editar Perfil</h1>
      <p className="text-center mt-4">Modifica tu perfil aqui</p>
      <form className=" max-w-sm m-auto mt-5" onSubmit={handleSubmit}>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="nombre"
          >
            Nombre
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="nombre"
            type="text"
            placeholder="Nombre"
            value={perfil.nombre || ""}
            onChange={(e) => setPerfil({ ...perfil, nombre: e.target.value })}
          />
        </div>
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="inline-email"
          >
            Email
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="email"
            type="email"
            placeholder="Email"
            value={perfil.email || ""}
            onChange={(e) => setPerfil({ ...perfil, email: e.target.value })}
          />
        </div>
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="telefono"
          >
            Telefono
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="telefono"
            type="tel"
            placeholder="Telefono"
            value={perfil.telefono || ""}
            onChange={(e) => setPerfil({ ...perfil, telefono: e.target.value })}
          />
        </div>
        <div className="md:flex md:items-center mb-6">
          <label
            className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
            htmlFor="web"
          >
            Web
          </label>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-teal-500"
            id="web"
            type="text"
            placeholder="Web"
            value={perfil.web || ""}
            onChange={(e) => setPerfil({ ...perfil, web: e.target.value })}
          />
        </div>
        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-teal-500 hover:bg-teal-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Guardar Cambios
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditarPerfil;
