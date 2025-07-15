import { Role, RoleRequest } from "../../Types/Roletypes";
import api from "../ApiService";

// Re-export the function to get role by id, from "RoleService"
import { getRoleById } from "./RoleService";

export { getRoleById };



// Obtener todos los roles
export async function getRoles(): Promise<Role[]> {
    try {
        const res = await api.get("/role");
        
        if ("error" in res.data) {
        console.error("Error:", res.data.error);
        return [];
        }

        return res.data as Role[];
    } catch (err) {
        console.error("Error fetching categories:", err);
        return [];
    }
}

export async function createRole(data: Partial<RoleRequest>) {
  try {
    if (!data.name || data.name.trim() === "") {
        alert("El nombre del rol es obligatorio.");
        throw new Error("The name was not provided for the role")
    }

    const res = await api.post("/role", data);
    return res.data as Role;
  } catch (error: any) {
    console.error("Error desconocido:", error);
  }
}

// Actualizar un rol existente
export async function editRole(id: number, roleData: Partial<RoleRequest>): Promise<Role> {
  const res = await api.patch(`/role/${id}`, roleData);
  return res.data as Role;
}

// Eliminar un rol
export async function deleteRole(id: number): Promise<void> {
  await api.delete(`/role/${id}`);
}