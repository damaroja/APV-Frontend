

import ListadoPacientes from "../components/ListadoPacientes"
import Formulario from "../components/Formulario"


const AdministrarPacientes = () => {
  return (
    <div className="flex md:flex-row">
      <div className="md:w-1/2 lg:w-2/5"><Formulario /></div>
      <div className="md:w-1/2 lg:w-3/5"><ListadoPacientes /></div>
    </div>
  )
}

export default AdministrarPacientes