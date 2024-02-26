

import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";


const usePacientes = () => {
    const context = useContext(PacientesContext);
    if (!context) {
        throw new Error("useAuth must be used within an PacientesProvider");
    }
    return context;
}

export default usePacientes;