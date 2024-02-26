import { useState } from "react";
import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
  const { pacientes } = usePacientes();

  return (
    <>
      {pacientes.length ? (
        <>
          {pacientes.map((paciente) => (
            <Paciente key={paciente._id} paciente={paciente} />
          ))}
        </>
      ) : (
        <>
          <h1 className="text-center mt-5 text-3xl">No hay pacientes</h1>
          <h3 className="text-center mt-3">
            {" "}
            Comienza a añadir pacientes en el formulario{" "}
          </h3>
        </>
      )}
    </>
  );
};

export default ListadoPacientes;
