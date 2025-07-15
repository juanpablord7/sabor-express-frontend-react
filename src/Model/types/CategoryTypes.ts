export type Category = {
  id: number;
  name: string;
  image: string; // ruta a imagen pequeña
};

export interface CategoryRequest {
  name: string;
  image: string;
}
