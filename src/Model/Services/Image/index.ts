import { useMock } from "../ServiceConfig";

import * as RealService from "./ImageManagService"
import * as MockService from "./mocks/ImageManagService.mock";

const service = useMock ? MockService : RealService;

export const imagePath = service.imagePath;
export const saveImage = service.saveImage;
export const editImage = service.editImage;
export const deleteImage = service.deleteImage;