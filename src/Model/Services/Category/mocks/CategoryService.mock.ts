import { Category } from "../../../Types/CategoryTypes";

export let mockCategories: Category[] = [
  { id: 0, name: "Otros", image: "category/Ensalada_Cesar.jpg" },
  { id: 1, name: "Hamburguesa", image: "category/Hamburguesa.jpg" },
  { id: 3, name: "Pizza", image: "category/Pizza.jpg" },
  { id: 4, name: "Helado", image: "category/Helado.jpg" },
];

export async function getCategories(): Promise<Category[]> {
  return mockCategories;
}