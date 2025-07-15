import { Category } from "../../Types/CategoryTypes";
import api from "../ApiService";

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