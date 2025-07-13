import api from "./axiosService";


const baseURL = import.meta.env.VITE_API_BASE_URL;

export const imagePath = baseURL + "/image/";

export async function saveImage(imagePath: string, file: File): Promise<boolean> {
  try {
    const formData = new FormData();
    formData.append("file", file);

    // Suponiendo que tu baseURL ya es algo como http://localhost:8081/api/image/
    const res = await api.post(`/image/${imagePath}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(res.data); // "Image uploaded successfully"
    return true;
  } catch (error: any) {
    if (error.response?.data?.message) {
      console.error("Error al subir imagen:", error.response.data.message);
    } else {
      console.error("Error desconocido:", error);
    }
    return false;
  }
}

export const editImage = async (filePath: string, file: File): Promise<void> => {
    const formData = new FormData();
    formData.append("file", file);

    // Sanear la ruta
    const sanitizedPath = filePath.replace(/\s+/g, "_");

    await api.put(`/image/${sanitizedPath}`, formData);
};

export const deleteImage = async (imagePath: string): Promise<boolean> => {
  try {
    await api.delete(`/image/${imagePath}`);
    return true;
  } catch (error: any) {
    console.error("Error al eliminar imagen:", error.response?.data?.message || error.message);
    return false;
  }
};
