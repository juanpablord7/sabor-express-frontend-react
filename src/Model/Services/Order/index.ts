import { useMock } from "../ServiceConfig";

import * as RealService from "./OrderService"
import * as MockService from "./mocks/OrderService.mock";

import * as RealManager from "./OrderManagService";
import * as MockManager from "./mocks/OrderManagService.mock";

const service = useMock ? MockService : RealService;
const manager = useMock ? MockManager : RealManager;

export const getMyOrders = service.getMyOrders;
export const getMyOrderById = service.getMyOrderById;
export const createMyOrder = service.createMyOrder;
export const deleteMyOrder = service.deleteMyOrder;

export const getOrders = manager.getOrders;
export const getOrderById = manager.getOrderById;
export const updateOrderState = manager.updateOrderState;