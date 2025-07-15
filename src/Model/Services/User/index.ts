import { useMock } from "../ServiceConfig";

import * as RealService from "./UserService"
import * as MockService from "./mocks/UserService.mock";

import * as RealLogin from "./LoginService"
import * as MockLogin from "./mocks/LoginService.mock";

import * as RealManager from "./UserManagService";
import * as MockManager from "./mocks/UserManagService.mock";

const service = useMock ? MockService : RealService;
const loginService = useMock ? MockLogin : RealLogin;
const manager = useMock ? MockManager : RealManager;

export const getMyUser = service.getMyUser;
export const editMyUser = service.editMyUser;
export const deleteMyUser = service.deleteMyUser;

export const login = loginService.login;
export const register = loginService.register;

export const getUsers = manager.getUsers;
export const getUserById = manager.getUserById;
export const editUser = manager.editUser;