import { Category, CategoryRequest } from "../../../Types/CategoryTypes";

//Re-export the function to get categories from "CategoryService"
import { mockCategories, getCategories } from "./CategoryService.mock";

export { getCategories };

let nextCategoryId = mockCategories.length + 1;

export async function createCategory(data: CategoryRequest): Promise<Category | null> {
  const newCategory: Category = {
    id: nextCategoryId++,
    name: data.name,
    image: data.image,
  };

  mockCategories.push(newCategory);
  return newCategory;
}

export async function editCategory(
  id: number,
  data: { name: string; image: string }
): Promise<Category> {
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index === -1) throw new Error("Categoría no encontrada");

  mockCategories[index] = {
    ...mockCategories[index],
    name: data.name,
    image: data.image,
  };

  return mockCategories[index];
}

export async function deleteCategory(id: number): Promise<void> {
  const index = mockCategories.findIndex((c) => c.id === id);
  if (index !== -1) {
    mockCategories.splice(index, 1);
  }
}