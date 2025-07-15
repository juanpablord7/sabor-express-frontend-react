import api from "../ApiService";

export async function getProducts(page: number, limit: number, categoryId?: number) {
  try {
    const params: any = { 
      page: page -1, 
      limit };
      
    if (categoryId !== undefined) {
      params.categoryId = categoryId;
    }

    const res = await api.get("/product", { params });

    const { content, totalItems } = res.data;

    if (Array.isArray(content) && typeof totalItems === "number") {
      return { totalItems, products: content };
    }

    return { totalItems: 0, products: [] };
  } catch (err) {
    console.error("Error fetching products:", err);
    return { totalItems: 0, products: [] };
  }
}

export async function getProductById(id: number, fields?: string) {
  try {
    const params: any = {};
    if (fields) {
      params.fields = fields;
    }

    const response = await api.get(`/product/${id}`, { params });
    return response.data;
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id}:`, error);
    return null;
  }
}

export async function findProducts(productIds: number[]) {
  try {
    if (!productIds.length) return [];

    const idsParam = productIds.join(",");

    const response = await api.get("/product/find", {
      params: { productIds: idsParam },
    });

    return response.data;
  } catch (error) {
    console.error("Error al obtener productos por IDs:", error);
    return [];
  }
}