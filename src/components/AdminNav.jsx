import { Link } from "react-router-dom";

const AdminNav = () => {
  return (
    <>
      <nav>
        <Link
          to="/admin/cambiarPassword"
          className="inline-block text-sm px-4 py-2 leading-none border rounded  border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 uppercase"
        >
          Cambiar Contraseña
        </Link>
      </nav>
    </>
  );
};

export default AdminNav;
