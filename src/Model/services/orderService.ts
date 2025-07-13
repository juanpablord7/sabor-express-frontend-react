import api from "./axiosService";
import { OrderDetail, Orders } from "../types/ordertypes";

//Endpoint GET /api/purchase
export async function getMyOrders(page: number, 
                                limit: number, 
                                state?: number)
                                :
                                Promise<{ totalItems: number; orders: Orders[] }> {
  try {
    const params: any = { page, limit };
    if (state !== undefined) {
      params.state = state;
    }

    const res = await api.get("/order/me", { params });

    const { content, totalItems } = res.data;

    if (Array.isArray(content) && typeof totalItems === "number") {
      return { totalItems, orders: content };
    }

    return { totalItems: 0, orders: [] };
  } catch (err) {
    console.error("Error fetching orders:", err);
    return { totalItems: 0, orders: [] };
  }
}

//Endpoint GET /api/purchase
export async function getMyOrderById(id: number){
  try{
    const res = await api.get(`/order/me/${id}`);

    return res.data as OrderDetail;
  } catch(err){
    console.error("Error fetching orders:", err);
  }
}

//Endpoint PATCH /api/purchase
export async function createMyOrder(products: number[], quantities: number[]){
    try{
        if(products.length !== quantities.length){
            
        }

        const data = {
            product: products,
            quantity: quantities
        }

        const res = await api.post(`/order/me`, data);

        return res.data as OrderDetail;
    } catch(err){
        console.error("Error fetching orders:", err);
    }
}

//Endpoint DELETE /api/purchase
export async function deleteMyOrder(id: number){
  try{
    await api.delete(`/order/me/${id}`);

    return;
  } catch(err){
    console.error("Error fetching orders:", err);
  }
}