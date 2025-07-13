import { User } from "../types/usertypes";
import api from "./axiosService";

export type UserRequest = {
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: number;
};

export async function getUsers(page: number, limit: number, role?: number) {
    try {
        const params: any = { page, limit };
        if (role !== undefined) {
            params.role = role;
        }
        const res = await api.get('/user', { params });
        
        const {totalItems, content} = res.data;

        if (Array.isArray(content) && typeof totalItems === "number") {
            return { totalItems, users: content };
        }

        return { totalItems: 0, users: [] };
    } catch (err) {
        console.error("Error fetching products:", err);
        return { totalItems: 0, users: [] };
    }
}

export const getUserById = async (id: number, fields?: string): Promise<User> => {
  try {
    const params: any = {};

    if (fields !== undefined) {
      params.fields = fields;
    }

    const res = await api.get(`/user/${id}`, { params });

    return res.data as User;
  } catch (err) {
    console.error("Error fetching user:", err);
    throw err; // También es buena práctica relanzar el error si quieres que lo maneje quien llama
  }
};

export const editUser = async (id: number, user: Partial<User>): Promise<User> => {
    const res = await api.patch(`/user/${id}`, user);
    return res.data as User;
};