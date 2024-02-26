


import useAuth from "../hooks/useAuth";




const Header = () => {

  const { cerrarSesion } = useAuth();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        
        <span className="font-semibold text-xl tracking-tight">Administrador de Pacientes de Veterinaria</span>
      </div>
      <div className="block lg:hidden">
        
      </div>
      <div className="w-full lg:flex lg:items-center lg:w-auto">
        <div>
          <a
            href="/admin"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
          >
            Pacientes
          </a>
          <a
            href="/admin/perfil"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-3"
          >
            Perfil
          </a>
          <a
            href="#"
            className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            onClick={cerrarSesion}
          >
            Cerrar Sesión
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Header;
