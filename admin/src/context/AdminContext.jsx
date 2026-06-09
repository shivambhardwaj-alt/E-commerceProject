import { createContext } from "react";
import { useState } from "react";



export const adminContext = createContext();
export const AdminContextProvider = ({children}) => {
    const[adminToken,setAdminToken] = useState(null);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const value = {
        adminToken,
        setAdminToken,
        backendUrl,
    }

return  ( <adminContext.Provider value={value}>
    {children}
</adminContext.Provider> )


}





