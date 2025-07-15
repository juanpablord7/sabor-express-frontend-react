import { Product, ProductRequest } from "../../../Types/ProductTypes";

export let mockProducts: Product[] = [
  { id: 1, category: 1, image: "product/Hamburguesa.jpg", name: "Hamburguesa Clasica", price: 9.99 },
  { id: 3, category: 3, image: "product/Pizza_Hawaiana.jpg", name: "Pizza Hawaiana", price: 12.99 },
  { id: 5, category: 4, image: "product/Copa_3_Bolas_Helado.jpg", name: "Copa de Helado (3 Bolas)", price: 6.99 },
  { id: 6, category: 0, image: "product/Ensalada_Cesar.jpg", name: "Ensalada Cesar", price: 3.99 },
  { id: 7, category: 3, image: "product/Pizza_Tocineta.jpg", name: "Pizza con Tocineta", price: 10.99 },
  { id: 8, category: 3, image: "product/Pizza_Queso.jpg", name: "Pizza de Queso", price: 8.99 },
  { id: 9, category: 3, image: "product/Pizza_con_Carne_Molida.jpg", name: "Pizza con Carne Molida", price: 10.99 },
  { id: 10, category: 3, image: "product/Pollo_y_Tocineta.jpg", name: "Pizza Pollo y Tocineta", price: 11.99 },
  { id: 11, category: 3, image: "product/Pollo_y_Champiñones.jpg", name: "Pizza Pollo y Champiñones", price: 10.99 },
  { id: 12, category: 1, image: "product/Hamburguesa_Tocineta.jpg", name: "Hamburguesa con Tocineta", price: 11.99 },
  { id: 13, category: 1, image: "product/Hamburguesa_Fantasma.jpg", name: "Hamburguesa Fantasma", price: 12.99 },
  { id: 14, category: 1, image: "product/Hamburguesa_Fantasma_Cheddar.jpg", name: "Hamburguesa Fantasma Cheddar", price: 13.99 },
];

export async function createProduct(data: ProductRequest): Promise<Product | null> {
  const newProduct: Product = {
    id: Math.max(...mockProducts.map((p) => p.id)) + 1,
    ...data,
  };

  mockProducts.push(newProduct);
  return newProduct;
}

export async function editProduct(
  id: number,
  data: { name: string; image: string }
): Promise<Product | null> {
  const index = mockProducts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  mockProducts[index] = {
    ...mockProducts[index],
    ...data,
  };

  return mockProducts[index];
}

export async function deleteProduct(id: number): Promise<void> {
  mockProducts = mockProducts.filter((p) => p.id !== id);
}
