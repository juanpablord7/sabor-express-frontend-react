export interface Role {
  id: number;
  name: string;
  default: boolean;
  manageProduct: boolean;
  manageOrder: boolean;
  manageUser: boolean;
  manageRole: boolean;
  promoteAll: boolean;
  editPassword: boolean;
  chef: boolean;
  delivery: boolean;
}

export interface RoleRequest {
  name: string;
  default: boolean;
  manageProduct: boolean;
  manageOrder: boolean;
  manageUser: boolean;
  manageRole: boolean;
  promoteAll: boolean;
  editPassword: boolean;
  chef: boolean;
  delivery: boolean;
}