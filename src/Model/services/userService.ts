import { User } from "../types/usertypes";
import api from "./axiosService";

export type UserRequest = {
    username: string;
    fullname: string;
    email: string;
    password: string;
    role: number;
    createdAt: string; // O `Date` si vas a convertirlo
    updatedAt: string; // O `Date`
};

export async function getMyUser(){
    try{
        const res = await api.get('/user/me');
        
        return res.data as User;
    } catch (err) {
        console.error("Error fetching products:", err);
    }
}

export const editMyUser = async (user: Partial<User>): Promise<User> => {
    console.log("Edit user")
    console.log(user)
    const res = await api.patch('/user/me', user);
    return res.data as User;
};

export const deleteMyUser = async (): Promise<string> => {
    const res = await api.delete('/user/me');
    return res.data;
};