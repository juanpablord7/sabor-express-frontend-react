import { User } from "../../../Types/Usertypes";
import { mockUsers } from "./LoginService.mock";

export async function getUsers(
  page: number,
  limit: number,
  role?: number
): Promise<{ totalItems: number; users: User[] }> {
  let filtered = [...mockUsers];

  if (role !== undefined) {
    filtered = filtered.filter((user) => user.role === role);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paged = filtered.slice(start, end);

  return {
    totalItems: filtered.length,
    users: paged,
  };
}

export const getUserById = async (
  id: number,
  fields?: string
): Promise<User> => {
  console.log("fields: " + fields)
  const user = mockUsers.find((u) => u.id === id);
  if (!user) throw new Error(`User with ID ${id} not found`);
  return user;
};

export const editUser = async (
  id: number,
  userData: Partial<User>
): Promise<User> => {
  const index = mockUsers.findIndex((u) => u.id === id);
  if (index === -1) throw new Error(`User with ID ${id} not found`);

  const updatedUser = {
    ...mockUsers[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  };

  mockUsers[index] = updatedUser;
  return updatedUser;
};