import { useMock } from "../ServiceConfig";

import * as RealService from "./ProductService"
import * as MockService from "./mocks/ProductService.mock";

import * as RealManager from "./ProductManagService";
import * as MockManager from "./mocks/ProductManagService.mock";

const service = useMock ? MockService : RealService;
const manager = useMock ? MockManager : RealManager;

export const getProducts = service.getProducts;
export const getProductById = service.getProductById;
export const findProducts = service.findProducts;

export const createProduct = manager.createProduct;
export const editProduct = manager.editProduct;
export const deleteProduct = manager.deleteProduct;