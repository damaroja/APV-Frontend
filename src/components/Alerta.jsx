


import React from "react";

const Alert = ({ alerta }) => {
  return (
    <div
      className={`${
        alerta.error
          ? "from-red-400 to-red-600"
          : "from-indigo-400 to-indigo-600"
      } bg-gradient-to-r text-white text-center font-bold py-5 px-4 rounded-lg mb-4 text-xl`}
    >
      {alerta.msg}
    </div>
  );
};

export default Alert;