import { useMock } from "../ServiceConfig";

import * as RealService from "./RoleService"
import * as MockService from "./mocks/RoleService.mock";

import * as RealManager from "./RoleManagService";
import * as MockManager from "./mocks/RoleManagService.mock";

const service = useMock ? MockService : RealService;
const manager = useMock ? MockManager : RealManager;

export const getRoleById = service.getRoleById;

export const getRoles = manager.getRoles;
export const createRole = manager.createRole;
export const editRole = manager.editRole;
export const deleteRole = manager.deleteRole;