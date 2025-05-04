import axios from "axios";
import { Product } from "../types/productTypes";

const lang = navigator.language || "en";
const baseURL = import.meta.env.VITE_API_BASE_URL;

export async function getProducts(page:number, limit:number) {
  try {
    const res = await axios.get(`${baseURL}/api/products`, {
      params: { lang, page, limit },
    });

    let { totalItems, products } = res.data;
    totalItems = parseInt(totalItems, 10);

    if (Array.isArray(products) && typeof totalItems === 'number') {
      return { totalItems, products };
    }

    return { totalItems: 0, products: [] };

  } catch (err) {
    console.log(err);
    return { totalItems: 0, products: [] };
  }
}

export async function findProducts(productsId:number[]){
  try {
    const res = await axios.post(`${baseURL}/api/products/find`, {
      ids: productsId //Id de los productos del carrito
    })

    const products = res.data
    console.log(res)
    if (Array.isArray(products)) {
      return { products };
    }

    return { products: [] };

  } catch (err) {
    console.log(err);
    return { products: [] };
  }
}

//Endpoint POST /api/products (Only Employees)
export async function createProduct(product:Product) {
}

//Endpoint PUT /api/products (Only Employees)
export async function replaceProduct() {
}

//Endpoint PATCH /api/products (Only Employees)
export async function updateProduct() {
}

//Endpoint DELETE /api/products (Only Employees)
export async function deleteProduct() {
}