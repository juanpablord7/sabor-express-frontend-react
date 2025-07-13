import { Category } from "../types/CategoryTypes";
import api from "./axiosService";

export interface CategoryRequest {
  name: string;
  image: string;
}

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await api.get("/category");

    if (!!res.data && "error" in res.data) {
      console.error("Error:", res.data.error);
      return [];
    }

    return res.data as Category[];
  } catch (err) {
    console.error("Error fetching categories:", err);
    return [];
  }
}

export async function createCategory(data: CategoryRequest): Promise<Category | null> {
  try {
    const res = await api.post("/category", data);
    return res.data as Category;
  } catch (error: any) {
    if (error.response?.data?.error) {
      console.error("Error al crear categoría:", error.response.data.error);
    } else {
      console.error("Error desconocido:", error);
    }
    return null;
  }
}

export const editCategory = async (
  id: number,
  data: { name: string; image: string }
): Promise<Category> => {
  const res = await api.patch(`/category/${id}`, data);
  return res.data as Category;
};

export const deleteCategory = async (id: number): Promise<void> => {
  await api.delete(`/category/${id}`);
};