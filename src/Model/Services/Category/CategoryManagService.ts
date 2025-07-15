import { Category, CategoryRequest } from "../../Types/CategoryTypes";
import api from "../ApiService";

//Re-export the function to get categories from "CategoryService"
import { getCategories } from "./CategoryService";

export { getCategories };

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