import { createContext, useEffect, useState } from "react";
import clienteAxios from "../config/axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      try {
        const token = localStorage.getItem("token-APV-0001");
        if (!token) {
          setCargando(false);
          return;
        }
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await clienteAxios("/veterinarios/perfil", config);
        setAuth(data);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesion = () => {
    setAuth({});
    localStorage.removeItem("token-APV-0001");
    return;
  };

  const actualizarPerfil = async (datos) => {
    try {
      const token = localStorage.getItem("token-APV-0001");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        `/veterinarios/perfil/${datos._id}`,
        datos,
        config
      );
      return {
        error: false,
        msg: "Perfil actualizado con exito",
      };
    } catch (error) {
      return {
        error: true,
        msg: "Hubo un error al actualizar el perfil",
      };
    }
  };

  const guardarPassword = async (datos) => {
    try {
      const token = localStorage.getItem("token-APV-0001");
      if (!token) {
        return;
      }
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios.put(
        '/veterinarios/actualizarPassword',
        datos,
        config
      );
      console.log(data);
      return {
        error: false,
        msg: "Password actualizado con exito",
      };
    } catch (error) {
      return {
        error: true,
        msg: "Hubo un error al actualizar el password",
      };
    }
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        cargando,
        cerrarSesion,
        actualizarPerfil,
        guardarPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthContext;
