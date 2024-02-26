import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {
  const { auth, cargando } = useAuth()
  
  if (cargando) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <Header />
      {auth?._id ? <Outlet /> : <Navigate to="/" />}
      <Footer />
    </>
  );
};

export default RutaProtegida;
