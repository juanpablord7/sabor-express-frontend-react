import { User } from "../../../Types/Usertypes";
import { mockUsers } from "./LoginService.mock";

function getCurrentUserIdFromToken(): number | null {
  const token = localStorage.getItem("token");
  if (!token || !token.startsWith("mock-token-")) return null;

  const idStr = token.replace("mock-token-", "");
  const id = parseInt(idStr, 10);
  return isNaN(id) ? null : id;
}

// Obtener el usuario actual desde el token
export async function getMyUser(): Promise<User | undefined> {
  try {
    const id = getCurrentUserIdFromToken();
    if (id === null) throw new Error("No authenticated user");

    return mockUsers.find((u) => u.id === id);
  } catch (err) {
    console.error("Error fetching user:", err);
  }
}

// Editar el usuario actual
export const editMyUser = async (user: Partial<User>): Promise<User> => {
  const id = getCurrentUserIdFromToken();
  if (id === null) throw new Error("No authenticated user");

  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");

  const updated = {
    ...mockUsers[index],
    ...user,
    updatedAt: new Date().toISOString(),
  };

  mockUsers[index] = updated;
  return updated;
};

// Eliminar el usuario actual
export const deleteMyUser = async (): Promise<string> => {
  const id = getCurrentUserIdFromToken();
  if (id === null) throw new Error("No authenticated user");

  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");

  mockUsers.splice(index, 1);
  localStorage.removeItem("token");

  return "User deleted successfully";
};
