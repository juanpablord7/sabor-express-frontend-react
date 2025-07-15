import { User } from "../../Types/Usertypes";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

//Endpoint POST /api/products
export async function login(username: string | null,
    email: string | null,
    password: string){
    
    const body: any = { password };
    if (username) body.username = username;
    else if (email) body.email = email;

    try{
        console.log("body: " + body.username + " " + body.password)
        const res = await axios.post(`${baseURL}/user/auth/login`, body);
        
        let token: string = ""
        if (res && res.data?.jwt) {
            token = res.data.jwt;
            localStorage.setItem("token", token)      
        }

        return {success: true, token};
    }catch(err){
        return {success:false, error: err};
    }   
}

export async function register(username: string,
    fullname: string,
    email: string,
    password: string) :
    
    Promise<{ success: true; user: User } | { success: false; error: unknown }> {
 
    const body: any = { 
        username,
        fullname,
        email,
        password
    };

    try{
        const res = await axios.post(`${baseURL}/user/auth/register`, body);

        const user: User = res.data;

        return {success: true, user};
    }catch(err){
        return {success:false, error: err};
    }   
}