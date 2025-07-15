import { useMock } from "../ServiceConfig";

import * as RealService from "./CategoryService"
import * as MockService from "./mocks/CategoryService.mock";

import * as RealManager from "./CategoryManagService";
import * as MockManager from "./mocks/CategoryManagService.mock";

const service = useMock ? MockService : RealService;
const manager = useMock ? MockManager : RealManager;

export const getCategories = service.getCategories;
export const createCategory = manager.createCategory;
export const editCategory = manager.editCategory;
export const deleteCategory = manager.deleteCategory;