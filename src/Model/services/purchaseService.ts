import { useEffect, useState } from "react";
import axios from 'axios';
import { CartItem } from "../types/type";

//Endpoint GET /api/purchase
export async function getPurchases(username:string){
    const [purchases, setPurchases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        axios.get("/api/purchase", {
            params: { username }
          })
          .then((res) => {
            setPurchases(res.data);
            setLoading(false);
          })
          .catch((err) => {
            setError(err);
            setLoading(false);
          });
      }, []);

    return {data: purchases, state: loading, error};
}

//Endpoint POST /api/purchase
export async function createPurchase(username:string, order:CartItem[]){
    try {
        const response = await axios.post("/api/purchase", 
            {
                params: { username, order},
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        return { data: response.data, error: null };
    }catch (error) {
        return { data: null, error };
    }
}

//Endpoint PUT /api/purchase
export async function replacePurchase(username:string){
}

//Endpoint PATCH /api/purchase
export async function updatePurchase(username:string){
}

//Endpoint DELETE /api/purchase
export async function deletePurchase(username:string){
}