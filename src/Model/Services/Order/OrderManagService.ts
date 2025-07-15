import api from "../ApiService";
import { OrderDetail, Orders } from "../../Types/Ordertypes";

//Endpoint GET /api/purchase
export async function getOrders(page: number, 
                                limit: number, 
                                state?: number)
                                :
                                Promise<{ totalItems: number; orders: Orders[] }> {
  try {
    const params: any = { 
      page: page -1, 
      limit };
    if (state !== undefined) {
      params.state = state;
    }

    const res = await api.get("/order", { params });

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
export async function getOrderById(id: number){
  try{
    const res = await api.get(`/order/${id}`);

    return res.data as OrderDetail;
  } catch(err){
    console.error("Error fetching orders:", err);
  }
}

//Endpoint PATCH /api/purchase
export async function updateOrderState(id: number, state?: number){
  try{
    const res = await api.post(`/order/${id}/state`, { state });
    return res.data as OrderDetail;
  } catch(err){
    console.error("Error fetching orders:", err);
  }

}