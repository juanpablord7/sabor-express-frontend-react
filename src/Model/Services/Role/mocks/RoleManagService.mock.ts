import { Role, RoleRequest } from "../../../Types/Roletypes";

// Datos simulados
export let mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    chef: true,
    delivery: true,
    editPassword: true,
    default: false,
    manageOrder: true,
    manageProduct: true,
    manageRole: true,
    manageUser: true,
    promoteAll: true,
  },
  {
    id: 2,
    name: "user",
    chef: false,
    delivery: false,
    editPassword: false,
    default: true,
    manageOrder: false,
    manageProduct: false,
    manageRole: false,
    manageUser: false,
    promoteAll: false,
  },
  {
    id: 4,
    name: "chef",
    chef: true,
    delivery: false,
    editPassword: false,
    default: false,
    manageOrder: true,
    manageProduct: true,
    manageRole: false,
    manageUser: true,
    promoteAll: false,
  },
  {
    id: 5,
    name: "delivery",
    chef: false,
    delivery: true,
    editPassword: false,
    default: false,
    manageOrder: true,
    manageProduct: false,
    manageRole: false,
    manageUser: true,
    promoteAll: false,
  },
];

// Obtener todos los roles
export async function getRoles(): Promise<Role[]> {
  return mockRoles;
}

// Crear un nuevo rol
export async function createRole(data: Partial<RoleRequest>): Promise<Role | undefined> {
  if (!data.name || data.name.trim() === "") {
    alert("El nombre del rol es obligatorio.");
    throw new Error("El nombre es obligatorio.");
  }

  const newRole: Role = {
    id: mockRoles.length ? Math.max(...mockRoles.map(r => r.id)) + 1 : 1,
    name: data.name.trim(),
    chef: !!data.chef,
    delivery: !!data.delivery,
    editPassword: !!data.editPassword,
    default: !!data.default,
    manageOrder: !!data.manageOrder,
    manageProduct: !!data.manageProduct,
    manageRole: !!data.manageRole,
    manageUser: !!data.manageUser,
    promoteAll: !!data.promoteAll,
  };

  mockRoles.push(newRole);
  return newRole;
}

// Editar un rol existente
export async function editRole(id: number, roleData: Partial<RoleRequest>): Promise<Role> {
  const index = mockRoles.findIndex(r => r.id === id);
  if (index === -1) throw new Error("Rol no encontrado");

  const updated = {
    ...mockRoles[index],
    ...roleData,
  };

  mockRoles[index] = updated as Role;
  return updated as Role;
}

// Eliminar un rol
export async function deleteRole(id: number): Promise<void> {
  mockRoles = mockRoles.filter(r => r.id !== id);
}
