import { User } from "../../Types/Usertypes";
import api from "../ApiService";

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