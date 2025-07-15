import { Role } from "../../../Types/Roletypes";
import { mockRoles } from "./RoleManagService.mock";

export async function getRoleById(id: number): Promise<Role> {
  if (id == null) {
    throw new Error("The id was not provided");
  }

  const role = mockRoles.find((r) => r.id === id);
  if (!role) {
    throw new Error(`Role with id ${id} not found`);
  }

  return role;
}
