

import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";


const PacientesContext = createContext()

const PacientesProvider = ({children}) => {


    const {auth} = useAuth()
    
    const getHeader = () => {
        const token = localStorage.getItem('token-APV-0001')
        if(!token) return null
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        return config
    }
    
    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})


    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const config = getHeader()
                const {data} = await clienteAxios.get('/pacientes', config);
                setPacientes(data.pacientes)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerPacientes()
    }, [auth])


    const guardarPaciente = async paciente => {
        if(paciente.id) {
            try {
                const config = getHeader()
                await clienteAxios.put(`/pacientes/${paciente.id}`, paciente, config)
                const pacientesActualizados = pacientes.map(p => {
                    if(p._id === paciente.id) {
                        paciente._id = paciente.id
                        return paciente
                    }
                    return p
                
                })
                setPacientes(pacientesActualizados)
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const config = getHeader()
                const {data} = await clienteAxios.post('/pacientes', paciente, config)
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado} = data.pacienteCreado
                setPacientes([pacienteAlmacenado, ...pacientes])
            } catch (error) {
                console.log(error)
            }
        }
    
    }

    const editarPaciente = paciente => {
        setPaciente(paciente)
    }

    const eliminarPaciente = id => {
        try {
            const config = getHeader()
            clienteAxios.delete(`/pacientes/${id}`, config)
            const pacientesActualizados = pacientes.filter(p => p._id !== id)
            setPacientes(pacientesActualizados)
        } catch (error) {
            console.log(error)
        }
        
    }
    
        return (
            <PacientesContext.Provider value={{
                pacientes,
                guardarPaciente,
                editarPaciente,
                eliminarPaciente,
                paciente
            }}>
                {children}
            </PacientesContext.Provider>
        )
}

export {PacientesProvider}

export default PacientesContext

