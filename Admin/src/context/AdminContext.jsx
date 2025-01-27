import axios from "axios";
import { createContext } from "react";

export const AdminContext = createContext(null);

const AdminContextProvider = (props) => {

    const url = 'http://localhost:5000/api'

    const addItem = async (name, description, price, image, category) => {
        const api = await axios.post(`${url}/food/add`, { name, description, price, image, category }, {
            headers: {
                "Content-Type": "Application/json",
            },
            withCredentials: true
        })

        return api.data;
    }


    const contextValue = {
        addItem
    }

    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;