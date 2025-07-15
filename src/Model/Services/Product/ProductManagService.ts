import { Product, ProductRequest } from "../../Types/ProductTypes";
import api from "../ApiService";

// Re-export the functions to get Products from "ProductService"
import { getProducts, getProductById, findProducts } from "./ProductService";

export { getProducts, getProductById, findProducts };

export async function createProduct(data: ProductRequest): Promise<Product | null> {
  try {
    const res = await api.post("/product", data);
    return res.data as Product;
  } catch (error: any) {
    if (error.response) {
      console.error("Error al crear producto:", error.response.data?.error || error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    return null;
  }
}

export const editProduct = async (
  id: number,
  data: { name: string; image: string }
): Promise<Product> => {
  const res = await api.patch(`/product/${id}`, data);
  return res.data as Product;
};

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/product/${id}`);
};