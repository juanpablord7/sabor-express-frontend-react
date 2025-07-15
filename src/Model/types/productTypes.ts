export type Product = {
    id: number
    name: string
    price: number
    category: number
    image: string
}

export interface ProductRequest {
  name: string;
  price: number;
  category: number;
  image: string;
}