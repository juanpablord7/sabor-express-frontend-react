import { Product } from "../../../Types/ProductTypes";

import { mockProducts } from "./ProductManagService.mock";

export async function getProducts(
  page: number,
  limit: number,
  categoryId?: number
): Promise<{ totalItems: number; products: Product[] }> {

  let filtered = [...mockProducts];

  if (categoryId !== undefined) {
    const catId = Number(categoryId);
    filtered = filtered.filter((p) => p.category === catId);
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = filtered.slice(start, end);

  return {
    totalItems: filtered.length,
    products: paginated,
  };
}

export async function getProductById(id: number, fields?: string): Promise<Product | null> {
  const product = mockProducts.find((p) => p.id === id);
  if (!product) return null;

  if (fields) {
    const selectedFields = fields.split(",");
    const result: any = {};
    for (const field of selectedFields) {
      if (field in product) result[field] = (product as any)[field];
    }
    return result as Product;
  }

  return product;
}

export async function findProducts(productIds: number[]): Promise<Product[]> {
  if (!productIds.length) return [];
  return mockProducts.filter((p) => productIds.includes(p.id));
}
