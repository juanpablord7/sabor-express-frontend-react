// src/services/mocks/ImageService.mock.ts

export const imagePath = "../docs/mock-images/";

export async function saveImage(imagePath: string, file: File): Promise<boolean> {
  console.log(`[MOCK] Subiendo imagen a: ${imagePath}`, file);
  // Simula una pequeña espera
  await new Promise((res) => setTimeout(res, 300));
  alert("La imagen no puede mostrarse porque no hay conexion con el servidor en esta version")
  return true;
}

export async function editImage(filePath: string, file: File): Promise<void> {
  console.log(`[MOCK] Editando imagen en: ${filePath}`, file);
  await new Promise((res) => setTimeout(res, 300));
  alert("La imagen no puede mostrarse porque no hay conexion con el servidor en esta version")
}

export async function deleteImage(imagePath: string): Promise<boolean> {
  console.log(`[MOCK] Eliminando imagen en: ${imagePath}`);
  await new Promise((res) => setTimeout(res, 300));
  return true;
}
