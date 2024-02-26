


import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {

    const [nombre, setNombre] = useState('')
    const [propietario, setPropietario] = useState('')
    const [email, setEmail] = useState('')
    const [fechaAlta, setFechaAlta] = useState('')
    const [sintomas, setSintomas] = useState('')
    const [alerta, setAlerta] = useState({})
    const [id, setId] = useState('')

    const { guardarPaciente, paciente } = usePacientes()

    useEffect(() => {
        if(paciente?._id) {
            setNombre(paciente.nombre || '')
            setPropietario(paciente.propietario || '')
            setEmail(paciente.email || '')
            setFechaAlta(paciente.fechaAlta || '')
            setSintomas(paciente.sintomas || '')
            setId(paciente._id || '')
        }
    }, [paciente])

    const handleSubmit = e => {
        e.preventDefault()
        if([nombre, propietario, email, fechaAlta, sintomas].includes('')) {
            setAlerta({
                msg: 'Todos los campos son obligatorios',
                error:true
            })
            setTimeout(() => {
                setAlerta({})
            }, 2000);
            return
        }   
        setAlerta({})
        guardarPaciente({nombre, propietario, email, fechaAlta, sintomas, id})
        setAlerta({
            msg: 'Paciente agregado correctamente',
            error:false
        })
        setNombre('')
        setPropietario('')
        setEmail('')
        setFechaAlta('')
        setSintomas('')
        setId('')
        setTimeout(() => {
            setAlerta({})
        }, 2000);
        return
    }


  return (
    <>
      <h2 className="text-2xl font-bold text-gray-800 text-center mt-4">
        Nuevo Paciente
      </h2>
      <div className="flex justify-center mt-5">
        <div className="w-full max-w-2xl">
          <form className="px-8" onSubmit={handleSubmit}>
          { alerta.msg ? <Alerta alerta={alerta} /> : null }
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="nombre"
              >
                Nombre
              </label>
              <input
                id="nombre"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="propietario"
              >
                Propietario
              </label>
              <input
                id="propietario"
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={propietario}
                onChange={e => setPropietario(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="hora"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="fecha"
              >
                Fecha Alta
              </label>
              <input
                id="fecha"
                type="date"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={fechaAlta}
                onChange={e => setFechaAlta(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="sintomas"
              >
                Síntomas
              </label>
              <textarea
                id="sintomas"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={sintomas}
                onChange={e => setSintomas(e.target.value)}
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-gray-800 w-full hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {id ? 'Editar Paciente' : 'Agregar Paciente'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
