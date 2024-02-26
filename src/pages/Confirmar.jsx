import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";


const Confirmar = () => {
  const { token } = useParams();
  const [alerta, setAlerta] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${token}`;
        await clienteAxios(url);
        setAlerta({
          error: false,
          msg: "Confirmacion exitosa, ya puedes iniciar sesion.",
        });
        setTimeout(() => {
          setAlerta({});
          navigate("/");
        }, 3000);
        return;
      } catch (error) {
        setAlerta({
          error: true,
          msg: "Error. Redirigiendo a la pagina principal..",
        });
        setTimeout(() => {
          setAlerta({});
          navigate("/");
        }, 3000);
        return;
      }
    };
    confirmarCuenta();
  }, []);

  return (
    <>
      <div className="text-indigo-600 font-black text-3xl mt-32">
        Confirmando Cuenta
      </div>
      <div>
        <h2 className="text-2xl font-bold mt-8 text-indigo-600">
          Confirmacion:
        </h2>
        {alerta.msg ? <Alerta alerta={alerta} /> : null}
      </div>
    </>
  );
};

export default Confirmar;
