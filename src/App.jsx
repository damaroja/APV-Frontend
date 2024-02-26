import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ResetPassword from "./pages/ResetPassword";
import Confirmar from "./pages/Confirmar";
import NuevoPassword from "./pages/NuevoPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

import RutaProtegida from "./layout/RutaProtegida";
import AdministrarPacientes from "./pages/AdministrarPacientes";
import CambiarPassword from "./pages/CambiarPassword";  
import EditarPerfil from "./pages/EditarPerfil";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />}></Route>
              <Route path="registrar" index element={<Registrar />}></Route>
              <Route
                path="resetPassword"
                index
                element={<ResetPassword />}
              ></Route>
              <Route
                path="resetPassword/:token"
                index
                element={<NuevoPassword />}
              ></Route>
              <Route
                path="confirmar/:token"
                index
                element={<Confirmar />}
              ></Route>
            </Route>
            <Route path="/admin" element={<RutaProtegida />}>
              <Route index element={<AdministrarPacientes />}></Route>
              <Route path="cambiarPassword" element={<CambiarPassword />}></Route>
              <Route path="perfil"  element={<EditarPerfil />}></Route>
            </Route>
          </Routes>
          <Routes></Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
