import React from "react";
import  usePacientes  from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {


    const formatDate = (date) => {
        const newDate = new Date(date);
        const options = {year: 'numeric', month: 'long', day: 'numeric'};
        return newDate.toLocaleDateString('es-ES', options);
      }

    const { editarPaciente, eliminarPaciente } = usePacientes()

  return (
    <>
      <div className="mt-8 flex justify-between">
        <div>
          <h3>
            <span className="font-bold">Nombre</span>: {paciente.nombre}
          </h3>
          <h3>
            <span className="font-bold">Propietario</span>:{" "}
            {paciente.propietario}
          </h3>
          <h3>
            <span className="font-bold">Email</span>: {paciente.email}
          </h3>
          <h3>
            <span className="font-bold">Fecha Alta</span>: {formatDate(paciente.fechaAlta)}
          </h3>
          <h3 className="mb-3">
            <span className="font-bold">Sintomas</span>: {paciente.sintomas}
          </h3>
          <hr />
        </div>
        <div className="flex flex-col">
          <button className="bg-yellow-400 p-2 text-white rounded-md mx-5 mb-3 hover:bg-yellow-300"
            onClick={() => editarPaciente(paciente)}
          >
            Editar
          </button>
          <button className="bg-red-600 p-2 text-white rounded-md mx-5 mb-3 hover:bg-red-500"
            onClick={() => eliminarPaciente(paciente._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </>
  );
};

export default Paciente;
