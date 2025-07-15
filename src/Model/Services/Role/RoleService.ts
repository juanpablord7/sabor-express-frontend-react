import { Role } from "../../Types/Roletypes";
import api from "../ApiService";

// Obtener un solo rol por ID
export async function getRoleById(id: number): Promise<Role> {
    if(id == null){
        throw new Error("The id was not provided")
    }
    const res = await api.get(`/role/${id}`);
    return res.data;
}
