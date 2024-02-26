import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid grid-cols-2">
        <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;
